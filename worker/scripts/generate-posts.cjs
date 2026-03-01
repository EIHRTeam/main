const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.resolve(__dirname, '../posts');
const outputFile = path.resolve(__dirname, '../src/posts.ts');

function generate() {
  const posts = { zh: {}, en: {} };
  const languages = ['zh', 'en'];

  languages.forEach(lang => {
    const langDir = path.join(postsDir, lang);
    if (!fs.existsSync(langDir)) {
      console.warn(`Warning: Directory ${langDir} does not exist.`);
      return;
    }

    const files = fs.readdirSync(langDir);
    files.forEach(file => {
      if (path.extname(file) !== '.md') return;

      const id = path.basename(file, '.md');
      const fileContent = fs.readFileSync(path.join(langDir, file), 'utf8');
      const { data, content: body } = matter(fileContent);

      // 生成摘要：取正文前150个字符
      const excerpt = data.excerpt || body.replace(/[#*`>\-\n]/g, ' ').trim().slice(0, 150) + '...';

      // 格式化日期 YYYY.MM.DD
      const date = data.date ? formatDate(data.date) : '';

      posts[lang][id] = {
        title: data.title || id,
        date: date,
        tags: data.tags || [],
        content: body, // 使用去除 Frontmatter 后的正文
        excerpt: excerpt
      };
    });
  });

  const output = `/**
 * 博客文章数据源
 * 
 * 此文件由 worker/scripts/generate-posts.cjs 自动生成
 * 生成时间: ${new Date().toISOString()}
 */

export interface PostData {
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt?: string;
}

export const posts: Record<string, Record<string, PostData>> = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(outputFile, output);
  console.log('Posts generated successfully to', outputFile);
}

function formatDate(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return String(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

generate();