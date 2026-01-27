import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  server: {
    port: 3000,
    host: '0.0.0.0',
    // 端口被占用时自动使用下一个可用端口
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://blog.eihrteam.org/',
        changeOrigin: true,
      },
    },
  },

  // 预览服务器配置（用于测试生产构建）
  preview: {
    port: 4173,
    strictPort: true,
  },

  plugins: [
    react({
      // 使用 SWC 加速开发（比 Babel 快 20x）
      // 注意：确保项目中没有依赖 Babel 插件
      // jsxRuntime: 'automatic', // React 17+ 默认已启用
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  // CSS 配置
  css: {
    // 开发模式下启用 CSS source map
    devSourcemap: true,
    // PostCSS 配置优化（已通过 postcss.config.js 配置）
  },

  // 构建配置
  build: {
    // 目标环境 - 使用现代浏览器特性
    target: 'esnext',

    // 代码分割优化
    rollupOptions: {
      output: {
        // 智能代码分割
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React 核心库（包括 scheduler）
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            // 动画库（包括依赖）
            if (id.includes('framer-motion') || id.includes('popmotion')) {
              return 'vendor-motion';
            }
            // 其他第三方库
            return 'vendor';
          }
        },
      },
    },

    // 启用 CSS 代码分割
    cssCodeSplit: true,

    // 小于 4KB 的资源内联为 base64
    assetsInlineLimit: 4096,

    // 代码压缩配置
    minify: 'esbuild',

    // esbuild 压缩选项
    esbuildOptions: {
      // 生产环境移除 console 和 debugger
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      // 启用更激进的优化
      legalComments: 'none',
    },

    // 禁用 source map（生产环境）
    sourcemap: false,

    // chunk 大小警告阈值（KB）
    chunkSizeWarningLimit: 1000,

    // 输出目录清理（默认 true）
    emptyOutDir: true,

    // 报告压缩后的大小（构建时显示 gzip 大小）
    reportCompressedSize: true,
  },

  // 优化依赖预构建
  optimizeDeps: {
    // 预构建的依赖
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
    // 排除不需要预构建的依赖
    exclude: [],
  },

  // 日志配置
  logLevel: 'info',

  // 清除屏幕
  clearScreen: true,
}));
