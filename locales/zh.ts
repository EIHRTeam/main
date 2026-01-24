import { ContentData } from '../types';

export const zh: ContentData = {
  nav: {
    home: "首页",
    projects: "资源",
    projects_short: "资源",
    blog: "博客",
    blog_short: "博客",
    contact: "联系",
    logo_full: "终末地工业人事部",
    logo_short: "终末地人事部",
  },
  hero: {
    title1: "极致攻略",
    title2: "解构未知",
    subtitle: "我们是专注于高难度副本解析与数据挖掘的游戏攻略团队。",
    cta: "加入我们",
    stat1_label: "篇深度指南",
    stat2_label: "活跃贡献者",
  },
  about: {
    title: "// 关于我们",
    description: "成立于2025年，致力于为玩家提供最准确、最硬核的游戏数据分析与通关策略。我们相信数据不仅是冰冷的数字，更是通往胜利的钥匙。",
  },
  projects: {
    title: "项目与资源",
    items: [
      { id: 1, title: "伤害计算器 Pro", category: "工具", desc: "基于最新公式的实时伤害预估工具，支持全职业。" },
      { id: 2, title: "副本数据库", category: "WIKI", desc: "收录超过500+怪物机制与掉落数据，每日更新。" },
      { id: 3, title: "配装模拟器", category: "Web App", desc: "可视化装备搭配，一键导出分享你的构建。" },
    ],
  },
  blog: {
    title: "最新情报",
    readMore: "阅读全文",
    viewAll: "查看更多情报",
    blogLink: "/blog",
    posts: [
      { id: 1, date: "2025.12.24", title: "V4.5 版本前瞻与机制解析", excerpt: "新版本不仅带来了新角色，底层的韧性机制也发生了根本性变化..." },
      { id: 2, date: "2026.01.26", title: "深渊第12层满星通关指南", excerpt: "针对本期深渊的高压环境，我们推荐以下三套阵容..." },
    ],
  },
  contact: {
    title: "建立连接",
    socials: "社交媒体",
    email: "staff@eihrteam.org",
  },
  footer: {
    nav: "网站导航",
    quickLinks: "快捷链接",
    quickLinksItems: [
      { label: "成就数据库", url: "https://medal.eihrteam.org" },
      { label: "INTEGRATED ICON SYSTEM", url: "https://iis.eihrteam.org" },
      { label: "ASR Platform", url: "https://asr.eihrteam.org" },
    ],
    friendLinks: "友情链接",
    friendLinksItems: [
      { label: "明日方舟：终末地 官网", url: "https://endfield.hypergryph.com/" },
      { label: "PRTS Wiki", url: "http://prts.wiki/" },
      { label: "森空岛 Wiki", url: "https://wiki.skland.com/endfield" },
    ],
    copyright: "© 2024 Endfield Industry Human Resource Team. All Rights Reserved.",
  }
};