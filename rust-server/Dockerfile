# 构建阶段
FROM rust:1.77-slim-bookworm as builder

WORKDIR /usr/src/eihr-blog-rs

COPY . .

# 编译发布版本
RUN cargo build --release

# 运行阶段
# 使用 Debian 12 (bookworm) slim 镜像，包含 glibc，体积小且兼容性好
FROM debian:bookworm-slim

# 安装必要的运行时依赖 (如果有 SSL 等需求可能需要 openssl)
# RUN apt-get update && apt-get install -y libssl-dev && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/src/eihr-blog-rs/target/release/eihr-blog-rs /usr/local/bin/eihr-blog-rs

EXPOSE 3002

# 默认数据卷路径
VOLUME ["/app/posts"]

# 启动命令
CMD ["eihr-blog-rs", "--posts-dir", "/app/posts", "--port", "3002"]
