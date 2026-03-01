import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { cache } from 'hono/cache';
import { posts } from './posts';

interface Env {
  ENVIRONMENT: string;
  SITE_URL?: string;
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
app.use(
  '/sitemap.xml',
  cache({
    cacheName: 'blog-api',
    cacheControl: 'public, max-age=3600', // 1 小时
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

function sanitizeSiteUrl(siteUrl: string | undefined): string | null {
  if (!siteUrl) return null;
  const input = siteUrl.trim();
  if (!input) return null;

  try {
    const url = input.startsWith('http://') || input.startsWith('https://')
      ? new URL(input)
      : new URL(`https://${input}`);
    return url.origin;
  } catch {
    return null;
  }
}

function getSiteOrigin(c: any): string {
  const configured = sanitizeSiteUrl(c.env.SITE_URL);
  if (configured) return configured;

  if (c.env.ENVIRONMENT !== 'production') {
    return new URL(c.req.url).origin;
  }

  return 'https://eihrteam.org';
}

function formatSitemapDate(dateInput: string | undefined): string | null {
  if (!dateInput) return null;
  const value = dateInput.trim();
  if (!value) return null;

  const normalized = value.replace(/\./g, '-');
  const directMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (directMatch) {
    const [, year, month, day] = directMatch;
    const testDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
    if (!isNaN(testDate.getTime())) {
      return `${year}-${month}-${day}`;
    }
  }

  const parsedDate = new Date(value);
  if (isNaN(parsedDate.getTime())) return null;
  return parsedDate.toISOString().slice(0, 10);
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface SitemapUrl {
  path: string;
  lastmod?: string;
  changefreq?: 'daily' | 'weekly' | 'monthly';
  priority?: string;
}

function buildSitemapXml(siteOrigin: string, urls: SitemapUrl[]): string {
  const body = urls
    .map((urlItem) => {
      const fullUrl = `${siteOrigin}${urlItem.path}`;
      const lines = [
        '<url>',
        `<loc>${escapeXml(fullUrl)}</loc>`,
      ];

      if (urlItem.lastmod) lines.push(`<lastmod>${urlItem.lastmod}</lastmod>`);
      if (urlItem.changefreq) lines.push(`<changefreq>${urlItem.changefreq}</changefreq>`);
      if (urlItem.priority) lines.push(`<priority>${urlItem.priority}</priority>`);
      lines.push('</url>');

      return lines.join('');
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

function handleGetSitemap(c: any) {
  try {
    const siteOrigin = getSiteOrigin(c);
    const postDateMap = new Map<string, string>();
    let latestDate: string | undefined;

    for (const langPosts of Object.values(posts)) {
      for (const [id, post] of Object.entries(langPosts)) {
        const sitemapDate = formatSitemapDate(post.date);
        const currentDate = postDateMap.get(id);
        if (sitemapDate && (!currentDate || sitemapDate > currentDate)) {
          postDateMap.set(id, sitemapDate);
        }
      }
    }

    for (const value of postDateMap.values()) {
      if (!latestDate || value > latestDate) {
        latestDate = value;
      }
    }

    const urls: SitemapUrl[] = [
      {
        path: '/',
        lastmod: latestDate,
        changefreq: 'weekly',
        priority: '1.0',
      },
      {
        path: '/blog',
        lastmod: latestDate,
        changefreq: 'daily',
        priority: '0.9',
      },
      ...Array.from(postDateMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([id, lastmod]) => ({
          path: `/blog/${encodeURIComponent(id)}`,
          lastmod,
          changefreq: 'weekly' as const,
          priority: '0.8',
        })),
    ];

    const xml = buildSitemapXml(siteOrigin, urls);
    return c.body(xml, 200, {
      'content-type': 'application/xml; charset=utf-8',
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return c.json({ error: 'Failed to generate sitemap' }, 500);
  }
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
app.get('/sitemap.xml', handleGetSitemap);

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
