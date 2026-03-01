# EIHR Blog API - Cloudflare Worker

这是博客 API 的 Cloudflare Worker 版本，可直接部署到 Cloudflare 边缘网络。

## 快速开始

### 1. 安装依赖

```bash
cd worker
pnpm install
```

### 2. 本地开发

```bash
pnpm dev
```

Worker 将在 `http://localhost:3002` 启动。

### 3. 部署

```bash
# 登录 Cloudflare（首次使用）
npx wrangler login

# 部署
pnpm deploy
```

## API 端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/` | GET | 健康检查 |
| `/api/posts` | GET | 获取所有文章列表 |
| `/api/posts/:id` | GET | 获取单篇文章 |
| `/sitemap.xml` | GET | 自动生成站点地图（首页、博客列表、文章详情） |

## 更新文章内容

### 方式一：自动生成（推荐）

1. 编辑 `../server/posts/` 目录中的 markdown 文件
2. 运行生成脚本：

```bash
pnpm generate-posts
```

3. 重新部署：

```bash
pnpm deploy
```

### 方式二：手动编辑

直接编辑 `src/posts.ts` 文件。

## 高级配置

### 使用 Cloudflare KV 存储

如果需要动态管理文章内容（无需重新部署），可以使用 Cloudflare KV：

1. 创建 KV 命名空间：

```bash
npx wrangler kv:namespace create "POSTS"
```

2. 将返回的 ID 添加到 `wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "POSTS"
id = "your-namespace-id"
```

3. 修改 `src/index.ts` 使用 KV 存储。

### 自定义域名

在 `wrangler.toml` 中添加：

```toml
routes = [
  { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

## 项目结构

```
worker/
├── src/
│   ├── index.ts      # 主入口，路由定义
│   └── posts.ts      # 文章数据
├── scripts/
│   └── generate-posts.js  # 从 markdown 生成 posts.ts
├── wrangler.toml     # Cloudflare 配置
├── tsconfig.json     # TypeScript 配置
└── package.json
```

## 与前端集成

部署后，更新前端的 API 地址：

```typescript
// vite.config.ts 中的代理配置
proxy: {
  '/api': {
    target: 'https://eihr-blog-api.your-subdomain.workers.dev',
    changeOrigin: true,
  },
}
```

或在生产环境直接调用 Worker URL。
