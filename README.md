# 终末地工业人事部门户网站

## 技术架构

### 核心技术栈

| 类别 | 技术选型 |
|------|----------|
| 运行环境 | Node.js |
| 前端框架 | React 19 |
| 构建工具 | Vite |
| 开发语言 | TypeScript (ES2022) |
| 样式方案 | Tailwind CSS |
| 动画引擎 | Framer Motion |
| 图标库 | Lucide React |
| Markdown 渲染 | react-markdown + remark-gfm + rehype-highlight |

### 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                      前端应用                            │
│  React SPA + Vite + TypeScript                          │
│  端口: 3000                                              │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP 请求 (/api/*)
                      ▼
┌─────────────────────────────────────────────────────────┐
│                      后端服务                            │
│  Express.js API Server                                  │
│  端口: 3002                                              │
└─────────────────────┬───────────────────────────────────┘
                      │ 文件读取
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   Markdown 文件                          │
│  server/posts/*.md                                      │
└─────────────────────────────────────────────────────────┘
```

## 目录结构

```
├── App.tsx                 # 应用根组件，管理路由与全局状态
├── index.tsx               # 应用入口，负责 DOM 挂载
├── index.css               # 全局样式，含代码高亮主题
├── types.ts                # TypeScript 类型定义
├── i18n.ts                 # 国际化配置
├── vite.config.ts          # Vite 构建配置
│
├── components/             # 通用组件
│   ├── GlitchElement.tsx   # 故障艺术视觉效果组件
│   ├── Section.tsx         # 标准化布局容器
│   ├── Navbar.tsx          # 导航栏
│   ├── Hero.tsx            # 首屏展示区
│   ├── About.tsx           # 关于我们
│   ├── Projects.tsx        # 项目展示
│   ├── Blog.tsx            # 博客预览（首页）
│   ├── Contact.tsx         # 联系方式
│   └── Footer.tsx          # 页脚
│
├── pages/                  # 页面组件
│   ├── Home.tsx            # 主页
│   ├── BlogList.tsx        # 博客归档页
│   └── BlogPost.tsx        # 博客文章详情页
│
├── services/               # API 服务层
│   └── blog.ts             # 博客 API 客户端
│
├── locales/                # 国际化资源
│   ├── zh.ts               # 中文语言包
│   └── en.ts               # 英文语言包
│
└── server/                 # 后端服务
    ├── index.js            # Express 服务入口
    ├── package.json        # 后端依赖配置
    └── posts/              # Markdown 文章存储目录
        ├── 1.md
        └── 2.md
```

## 博客系统

本项目集成基于文件系统的博客管理功能，运维人员可通过在服务器指定目录放置 Markdown 文件实现文章发布。

### 运作机制

1. 后端服务扫描指定目录下的 `.md` 文件
2. 解析文件头部的 YAML Front Matter 提取元数据
3. 前端通过 API 获取文章列表及内容
4. 使用 react-markdown 渲染 Markdown 内容，支持语法高亮

### 文章格式规范

文章须遵循以下格式：

```markdown
---
title: 文章标题
date: 2026-01-25
tags: [标签1, 标签2]
---

# 正文内容

此处编写 Markdown 格式的正文内容。
```

**Front Matter 字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文章标题，用于列表及详情页展示 |
| date | string | 是 | 发布日期，格式为 YYYY-MM-DD，用于排序 |
| tags | array | 否 | 文章标签，用于分类展示 |
| excerpt | string | 否 | 自定义摘要，默认取正文前 150 字符 |

### 支持的 Markdown 语法

| 功能 | 说明 |
|------|------|
| 标题 | 支持 H1-H6 多级标题 |
| 文本格式 | 粗体、斜体、删除线 |
| 列表 | 有序列表、无序列表、任务列表（带复选框） |
| 代码 | 行内代码、代码块（支持语法高亮） |
| 表格 | GFM 风格表格 |
| 链接与图片 | 标准 Markdown 语法 |
| 引用 | 块引用 |
| 分隔线 | 水平分隔线 |

### 访问规则

文章 URL 以文件名（不含扩展名）作为标识符：

| 文件路径 | 访问 URL |
|----------|----------|
| `server/posts/1.md` | `/blog/1` |
| `server/posts/guide.md` | `/blog/guide` |
| `server/posts/2026-01-news.md` | `/blog/2026-01-news` |

### 环境配置

文章存储目录可通过环境变量 `POSTS_DIR` 自定义：

```bash
POSTS_DIR=/var/www/blog/posts node server/index.js
```

若未设置该变量，默认使用 `server/posts/` 目录。

## 开发指南

### 环境要求

- Node.js 18.0 或更高版本（推荐使用 LTS 版本）
- npm 或 yarn 包管理器

### 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server && npm install
```

### 启动开发环境

需同时启动前端开发服务器与后端 API 服务：

```bash
# 终端 1：启动后端服务（端口 3002）
cd server && npm run dev

# 终端 2：启动前端服务（端口 3000）
npm run dev
```

启动完成后，访问 `http://localhost:3000` 即可预览网站。

### 生产构建

执行以下命令生成优化后的静态资源：

```bash
npm run build
```

构建产物输出至 `dist` 目录。

### 本地预览

预览生产构建结果：

```bash
npm run preview
```

## API 接口文档

后端服务提供以下 RESTful API 接口：

### 获取文章列表

**请求**

```
GET /api/posts
```

**响应**

```json
{
  "posts": [
    {
      "id": "1",
      "title": "文章标题",
      "date": "2026.01.25",
      "excerpt": "文章摘要，取正文前 150 字符...",
      "tags": ["标签1", "标签2"]
    }
  ]
}
```

文章按发布日期降序排列。

### 获取单篇文章

**请求**

```
GET /api/posts/:id
```

**响应**

```json
{
  "id": "1",
  "title": "文章标题",
  "date": "2026.01.25",
  "content": "Markdown 格式的完整正文内容...",
  "tags": ["标签1", "标签2"]
}
```

**错误响应**

```json
{
  "error": "Post not found"
}
```

状态码：404

## 构建配置

项目配置文件 `vite.config.ts` 包含以下关键配置：

- **路径别名**：`@` 指向项目根目录
- **开发服务器**：端口 3000，启用 host 以支持局域网访问
- **API 代理**：开发环境下 `/api` 请求代理至后端服务 `http://localhost:3002`

## 版权声明

本项目为专有软件，版权归终末地工业人事部所有。未经授权，禁止复制、修改或分发。
