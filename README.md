# 终末地工业人事部门户网站

## 技术架构

### 核心技术栈

| 类别 | 技术选型 |
|------|----------|
| 运行环境 | Node.js / Rust (可选) |
| 前端框架 | React 19 |
| 构建工具 | Vite |
| 开发语言 | TypeScript (ES2022) |
| 样式方案 | Tailwind CSS |
| 动画引擎 | Framer Motion |
| 图标库 | Lucide React |
| Markdown 渲染 | react-markdown + remark-gfm + rehype-highlight |

### 系统架构

本项目采用前后端分离架构，前端为单页应用 (SPA)，后端提供 RESTful API 服务。

```text
┌─────────────────────────────────────────────────────────┐
│                      前端应用                            │
│  React SPA + Vite + TypeScript                          │
│  端口: 3000                                              │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP 请求 (/api/*)
                      ▼
┌─────────────────────────────────────────────────────────┐
│                      后端服务                            │
│  Node.js (开发/轻量) 或 Rust (生产/高性能)                │
│  端口: 3002                                              │
└─────────────────────┬───────────────────────────────────┘
                      │ 文件读取
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   Markdown 文件                          │
│  server/posts/{lang}/*.md                               │
└─────────────────────────────────────────────────────────┘
```

## 后端服务方案

本项目提供两种后端实现，可根据部署环境和性能需求选择。

### 1. Node.js 后端 (默认)

基于 Express.js 开发，适合开发环境及轻量级部署。

*   **入口文件**: `server/index.js`
*   **启动命令**: `npm run server`

### 2. Rust 后端 (高性能)

基于 Axum + Tokio 开发，编译为原生二进制文件。具有极低的内存占用和极高的响应速度，特别适合配置较低的 Linux 服务器。

*   **源代码目录**: `rust-server/`
*   **启动命令**: `npm run server:rust` (需安装 Rust 环境)
*   **详细文档**: 请参阅 `rust-server/README.md`

## 博客系统与国际化

本项目内置基于文件系统的双语博客功能。

### 目录结构规范

文章存储在 `server/posts/` 目录下，按语言代码 (`zh`, `en`) 分类存储。同名文件视为同一篇文章的不同语言版本。

```text
server/posts/
├── zh/                # 中文文章目录
│   ├── post-1.md
│   └── weekly-update.md
└── en/                # 英文文章目录
    ├── post-1.md      # 对应中文 post-1.md
    └── weekly-update.md
```

### 文章格式规范

文章须遵循 Markdown 格式，并包含 YAML Front Matter 元数据：

```markdown
---
title: 文章标题
date: 2026-02-07
tags: [标签1, 标签2]
excerpt: 自定义摘要（可选）
---

# 正文内容

此处编写 Markdown 格式的正文内容。
```

**特殊标签说明：**

*   `机翻_{lang}`: 标记文章为机器翻译（如 `机翻_en`），前端将显示黄色提示 Banner。
*   `翻译_{lang}`: 标记文章为人工翻译（如 `翻译_ja`），前端将显示蓝色提示 Banner。

## 开发指南

### 环境要求

*   Node.js 20.0 或更高版本
*   pnpm 包管理器 (推荐)
*   Rust 工具链 (仅在开发 Rust 后端时需要)

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

需同时启动前端开发服务器与后端 API 服务。

```bash
# 启动前端 (端口 3000)
pnpm dev

# 启动后端 (Node.js 版, 端口 3002)
pnpm server

# 或启动后端 (Rust 版, 端口 3002)
pnpm server:rust
```

### 生产构建

1.  **前端构建**：
    ```bash
    pnpm build
    ```
    构建产物输出至 `dist` 目录。

2.  **后端构建**：
    *   **Node.js**: 部署 `server` 目录及 `node_modules`。
    *   **Rust**: 运行 `cargo build --release` 生成二进制文件。

## 版权声明

本项目为专有软件，版权归终末地工业人事部所有。未经授权，禁止复制、修改或分发。