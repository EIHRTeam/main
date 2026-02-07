import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { cache } from 'hono/cache';
import { posts } from './posts';

interface Env {
  ENVIRONMENT: string;
}

const app = new Hono<{ Bindings: Env }>();

// CORS 配置
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return origin;
      try {
        const url = new URL(origin);
        const hostname = url.hostname;
        if (
          hostname === 'localhost' ||
          hostname.endsWith('.eihrteam.org') ||
          hostname === 'eihrteam.org' ||
          hostname.endsWith('.hcaor.org') ||
          hostname === 'hcaor.org'
        ) {
          return origin;
        }
        return 'https://eihrteam.org';
      } catch {
        return 'https://eihrteam.org';
      }
    },
    allowMethods: ['GET', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    maxAge: 86400,
  })
);

// 缓存配置
app.use(
  '/posts/*',
  cache({
    cacheName: 'blog-api',
    cacheControl: 'public, max-age=300', // 5 分钟
  })
);
app.use(
  '/api/*',
  cache({
    cacheName: 'blog-api',
    cacheControl: 'public, max-age=300', // 5 分钟
  })
);

/**
 * 格式化日期为 YYYY.MM.DD 格式
 */
function formatDate(dateInput: string | undefined): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return String(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * 生成摘要
 */
function generateExcerpt(content: string, maxLength = 150): string {
  const cleaned = content.replace(/[#*`>\-\n]/g, ' ').trim();
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) + '...' : cleaned;
}

// 根路径检查
app.get('/', (c) => {
  return c.json({
    name: 'EIHR Blog API',
    version: '1.0.0',
    status: 'ok',
    environment: c.env.ENVIRONMENT,
  });
});

/**
 * 获取文章列表
 */
function handleGetPosts(c: any) {
  try {
    const lang = c.req.query('lang') === 'en' ? 'en' : 'zh';
    const langPosts = posts[lang] || {};
    
    const postList = Object.entries(langPosts).map(([id, post]) => ({
      id,
      title: post.title,
      date: formatDate(post.date),
      excerpt: post.excerpt || generateExcerpt(post.content),
      tags: post.tags || [],
    }));

    // 按日期降序排序
    postList.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date.replace(/\./g, '-')).getTime() - new Date(a.date.replace(/\./g, '-')).getTime();
    });

    return c.json({ posts: postList });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return c.json({ error: 'Failed to fetch posts' }, 500);
  }
}

/**
 * 获取单篇文章
 */
function handleGetPost(c: any) {
  try {
    const id = c.req.param('id');
    const lang = c.req.query('lang') === 'en' ? 'en' : 'zh';
    const langPosts = posts[lang] || {};
    const post = langPosts[id];

    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }

    return c.json({
      id,
      title: post.title,
      date: formatDate(post.date),
      content: post.content,
      tags: post.tags || [],
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return c.json({ error: 'Failed to fetch post' }, 500);
  }
}

// 路由注册
app.get('/posts', handleGetPosts);
app.get('/api/posts', handleGetPosts);

app.get('/posts/:id', handleGetPost);
app.get('/api/posts/:id', handleGetPost);

// 404 处理
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// 错误处理
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;