import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = process.env.POSTS_DIR || path.join(__dirname, 'posts');

/**
 * 格式化日期为 YYYY.MM.DD 格式
 */
function formatDate(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return String(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

/**
 * 获取所有博客文章列表
 * GET /api/posts?lang=zh
 * 
 * 返回格式:
 * {
 *   posts: [
 *     { id: "1", title: "...", date: "...", excerpt: "..." },
 *     ...
 *   ]
 * }
 */
app.get('/api/posts', async (req, res) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'zh';
    const langDir = path.join(POSTS_DIR, lang);
    
    try {
      await fs.access(langDir);
    } catch {
      return res.json({ posts: [] });
    }

    const files = await fs.readdir(langDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    const posts = await Promise.all(
      mdFiles.map(async (filename) => {
        const id = path.basename(filename, '.md');
        const filePath = path.join(langDir, filename);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: body } = matter(content);
        
        // 生成摘要：取正文前150个字符
        const excerpt = data.excerpt || body.replace(/[#*`>\-\n]/g, ' ').trim().slice(0, 150) + '...';
        
        return {
          id,
          title: data.title || id,
          date: formatDate(data.date),
          excerpt,
          tags: data.tags || [],
        };
      })
    );
    
    // 按日期降序排序
    posts.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    res.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

/**
 * 获取单篇博客文章
 * GET /api/posts/:id?lang=zh
 * 
 * 返回格式:
 * {
 *   id: "1",
 *   title: "...",
 *   date: "...",
 *   content: "markdown content...",
 *   tags: []
 * }
 */
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lang = req.query.lang === 'en' ? 'en' : 'zh';
    const filePath = path.join(POSTS_DIR, lang, `${id}.md`);
    
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    res.json({
      id,
      title: data.title || id,
      date: formatDate(data.date),
      content,
      tags: data.tags || [],
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.listen(PORT, () => {
  console.log(`Blog API server running at http://localhost:${PORT}`);
  console.log(`Posts directory: ${POSTS_DIR}`);
});
