# EIHR Blog Backend (Rust Edition)

本项目是基于 Rust 语言开发的高性能博客后端服务，旨在替代原有的 Node.js 后端，专为资源受限的 Debian/Ubuntu Linux 服务器环境进行优化。

## 功能特性

*   **高性能响应**：基于 `Axum` Web 框架和 `Tokio` 异步运行时构建，充分利用 Rust 的零成本抽象和异步 I/O 能力。
*   **内存驻留架构**：服务启动时自动扫描并解析所有 Markdown 文章至内存，运行时无磁盘 I/O 操作，确保极低的延迟。
*   **低资源占用**：编译后的二进制文件体积约为 5MB，运行时内存占用通常低于 10MB，无垃圾回收 (GC) 开销。
*   **Systemd 集成**：提供标准的 Systemd 服务单元文件，支持作为系统服务稳定运行及管理。
*   **多语言支持**：原生支持基于目录结构的国际化 (i18n) 内容管理。

## 快速开始

### 开发环境

1.  **安装 Rust 工具链**：
    请访问 Rust 官方网站获取安装脚本。

2.  **本地运行**：
    ```bash
    cd rust-server
    cargo run -- --posts-dir ../server/posts
    ```

### 生产环境部署 (Debian/Ubuntu)

#### 方法一：使用 Debian 软件包安装 (推荐)

本项目已配置 CI/CD 流程，自动构建适用于 AMD64 架构的 `.deb` 安装包。

1.  从 Release 页面下载最新的 `.deb` 文件。
2.  执行安装命令：
    ```bash
    sudo dpkg -i eihr-blog-rs_*.deb
    ```
3.  服务将自动安装并启动。默认数据目录位于 `/var/lib/eihr-blog-rs/posts`。

#### 方法二：使用 Systemctl 管理

安装完成后，可使用标准的 systemctl 命令管理服务：

```bash
# 查看服务状态
sudo systemctl status eihr-blog-rs

# 启动服务
sudo systemctl start eihr-blog-rs

# 停止服务
sudo systemctl stop eihr-blog-rs

# 重启服务
sudo systemctl restart eihr-blog-rs

# 查看运行日志
sudo journalctl -u eihr-blog-rs -f
```

## 配置说明

后端服务支持通过命令行参数或环境变量进行配置。在 Systemd 环境下，建议通过修改服务单元文件中的环境变量进行配置。

| 参数 | 环境变量 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `--posts-dir` | `POSTS_DIR` | `../server/posts` | 文章存储的根目录路径 |
| `--host` | `HOST` | `0.0.0.0` | 服务监听地址 |
| `--port` | `PORT` | `3002` | 服务监听端口 |
| `-` | `RUST_LOG` | `info` | 日志级别 (info/debug/error) |

### 目录结构规范

`POSTS_DIR` 指定的目录必须包含按语言代码命名的子目录，如下所示：

```text
/var/lib/eihr-blog-rs/posts/
├── zh/
│   ├── post-id-1.md
│   └── post-id-2.md
└── en/
    ├── post-id-1.md
    └── post-id-2.md
```

## 构建指南

若需手动编译项目，请参考以下步骤：

```bash
# 编译发布版本
cargo build --release

# 生成 Debian 安装包 (需预先安装 cargo-deb)
cargo install cargo-deb
cargo deb
```