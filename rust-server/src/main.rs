use axum::{
    extract::{Path, Query, State},
    http::{Method, StatusCode},
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use clap::Parser;
use gray_matter::{engine::YAML, Matter};
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    path::{PathBuf, Component},
    sync::{Arc, RwLock},
};
use tower_http::{cors::{Any, CorsLayer}, trace::TraceLayer};
use tracing::{info, warn};
use walkdir::WalkDir;

// --- 数据结构定义 ---

#[derive(Debug, Clone, Serialize, Deserialize)]
struct PostMeta {
    #[serde(default)]
    title: String,
    #[serde(default)]
    date: String, // 原始日期字符串，暂不做复杂解析
    #[serde(default)]
    tags: Vec<String>,
    #[serde(default)]
    excerpt: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
struct Post {
    id: String,
    title: String,
    date: String,
    tags: Vec<String>,
    excerpt: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    content: Option<String>, // 在列表页时不返回 content
}

// 内存中的文章存储结构: lang -> id -> Post
type PostStore = HashMap<String, HashMap<String, Post>>;

#[derive(Clone)]
struct AppState {
    posts: Arc<RwLock<PostStore>>,
}

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// 文章存放的根目录
    #[arg(short, long, env = "POSTS_DIR", default_value = "../server/posts")]
    posts_dir: PathBuf,

    /// 监听地址
    #[arg(short, long, env = "HOST", default_value = "0.0.0.0")]
    host: String,

    /// 监听端口
    #[arg(short, long, env = "PORT", default_value_t = 3002)]
    port: u16,
}

#[derive(Deserialize)]
struct LangQuery {
    lang: Option<String>,
}

// --- 主程序 ---

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // 初始化日志
    tracing_subscriber::fmt::init();

    // 解析命令行参数
    let args = Args::parse();
    info!("Loading posts from: {:?}", args.posts_dir);

    // 加载文章
    let posts = load_posts(&args.posts_dir)?;
    let post_count: usize = posts.values().map(|m| m.len()).sum();
    info!("Loaded {} posts across {} languages", post_count, posts.len());

    let state = AppState {
        posts: Arc::new(RwLock::new(posts)),
    };

    // 配置 CORS
    let cors = CorsLayer::new()
        .allow_origin(Any) 
        .allow_methods([Method::GET, Method::OPTIONS])
        .allow_headers(Any);

    // 构建路由
    let app = Router::new()
        .route("/api/posts", get(list_posts))
        .route("/api/posts/:id", get(get_post))
        .layer(TraceLayer::new_for_http())
        .layer(cors)
        .with_state(state);

    // 启动服务器
    let addr_str = format!("{}:{}", args.host, args.port);
    let addr: std::net::SocketAddr = addr_str.parse()?;
    info!("Server listening on http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

// --- 业务逻辑 ---

// 启动时一次性加载所有文章
fn load_posts(root_dir: &PathBuf) -> anyhow::Result<PostStore> {
    let mut store: PostStore = HashMap::new();
    let matter = Matter::<YAML>::new();

    for entry in WalkDir::new(root_dir).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        if path.extension().map_or(false, |ext| ext == "md") {
            // 解析路径结构: root_dir/{lang}/{id}.md
            // 我们需要获取相对于 root_dir 的路径
            if let Ok(relative) = path.strip_prefix(root_dir) {
                // components() 会返回路径各部分。期望结构: lang / filename
                let components: Vec<_> = relative.components().collect();
                if components.len() == 2 {
                    if let (Component::Normal(lang_os), Component::Normal(filename_os)) = (components[0], components[1]) {
                        let lang = lang_os.to_string_lossy().to_string();
                        let filename = filename_os.to_string_lossy().to_string();
                        let id = filename.trim_end_matches(".md").to_string();

                        // 读取并解析文件
                        if let Ok(content_str) = std::fs::read_to_string(path) {
                            let parsed = matter.parse(&content_str);
                            
                            // 尝试解析 frontmatter
                            let meta: PostMeta = parsed.data.as_ref()
                                .map(|d| d.deserialize().unwrap_or_else(|_| PostMeta {
                                    title: id.clone(),
                                    date: "".to_string(),
                                    tags: vec![],
                                    excerpt: None,
                                }))
                                .unwrap_or_else(|| PostMeta {
                                    title: id.clone(),
                                    date: "".to_string(),
                                    tags: vec![],
                                    excerpt: None,
                                });

                            // 生成摘要
                            let excerpt = meta.excerpt.clone().unwrap_or_else(|| {
                                let body = parsed.content.clone();
                                let cleaned = body.replace(|c: char| c == '#' || c == '*' || c == '`' || c == '>' || c == '-', " ");
                                let cleaned = cleaned.trim();
                                if cleaned.len() > 150 {
                                    format!("{}...", &cleaned[0..150])
                                } else {
                                    cleaned.to_string()
                                }
                            });
                            
                            // 格式化日期 (简单的 YYYY-MM-DD -> YYYY.MM.DD)
                            let date = meta.date.replace('-', ".");

                            let post = Post {
                                id: id.clone(),
                                title: meta.title,
                                date,
                                tags: meta.tags,
                                excerpt,
                                content: Some(parsed.content),
                            };

                            store.entry(lang).or_default().insert(id, post);
                        } else {
                            warn!("Failed to read file: {:?}", path);
                        }
                    }
                }
            }
        }
    }

    Ok(store)
}

// 获取文章列表
async fn list_posts(
    State(state): State<AppState>,
    Query(query): Query<LangQuery>,
) -> Json<serde_json::Value> {
    let lang = query.lang.unwrap_or_else(|| "zh".to_string());
    let store = state.posts.read().unwrap();
    
    if let Some(lang_posts) = store.get(&lang) {
        let mut posts: Vec<Post> = lang_posts.values().cloned().map(|mut p| {
            p.content = None; // 列表页移除内容以减小体积
            p
        }).collect();

        // 按日期降序排序
        posts.sort_by(|a, b| {
            // 简单的字符串比较，因为日期格式统一为 YYYY.MM.DD
            b.date.cmp(&a.date)
        });

        Json(serde_json::json!({ "posts": posts }))
    } else {
        Json(serde_json::json!({ "posts": [] }))
    }
}

// 获取文章详情
async fn get_post(
    Path(id): Path<String>,
    State(state): State<AppState>,
    Query(query): Query<LangQuery>,
) -> impl IntoResponse {
    let lang = query.lang.unwrap_or_else(|| "zh".to_string());
    let store = state.posts.read().unwrap();

    if let Some(lang_posts) = store.get(&lang) {
        if let Some(post) = lang_posts.get(&id) {
            return Json(serde_json::json!(post)).into_response();
        }
    }

    (StatusCode::NOT_FOUND, Json(serde_json::json!({ "error": "Post not found" }))).into_response()
}