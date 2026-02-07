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
    copyright_statement: "著作权声明",
  },
  hero: {
    title1: "极致攻略",
    title2: "解构未知",
    subtitle: "我们是？",
    cta: "关注我们",
    stat1_label: "篇深度指南（假的）",
    stat2_label: "活跃贡献者",
  },
  about: {
    title: "// 关于我们",
    description: "成立于2025年，中间忘了，后面忘了。",
  },
  projects: {
    title: "项目与资源",
    items: [
      { id: 1, title: "成就跟踪器", category: "工具", desc: "全面的终末地蚀刻章数据库。", link: "https://medal.eihrteam.org/" },
      { id: 2, title: "敬请期待", category: "Coming S∞n™", desc: "别急，让我先急" },
      { id: 3, title: "敬请期待", category: "Coming S∞n™", desc: "点击输入文本" },
    ],
  },
  blog: {
    title: "最新情报",
    readMore: "阅读全文",
    viewAll: "查看更多情报",
    blogLink: "/blog",
    // i18n strings for blog pages
    loadError: "无法加载文章列表",
    loadPostError: "加载文章失败",
    noPosts: "暂无文章",
    retry: "重试",
    loading: "LOADING DATA...",
    notFoundTitle: "404 // DATA_NOT_FOUND",
    notFoundDesc: "请求的文章不存在",
    returnToArchive: "Return to Archive",
    share: "共享",
          shareMenu: {
          system: "共享",
          copy: "复制链接",
          print: "打印页面",
          copied: "链接已复制",
        },
        translationBanner: {
          machine: "此文章由机器翻译自",
          manual: "此文章翻译自",
          originalLang: {
            en: "英文",
            zh: "中文",
            ja: "日文",
            ko: "韩文",
            ru: "俄文",
          },
        },
      },
      contact: {    title: "建立连接",
    description: "无论你是想提出意见，还是只想打个招呼，我们都随时欢迎。",
    socials: "社交媒体",
    email: "staff@eihrteam.org",
    socialLinks: {  
      bilibili: "https://space.bilibili.com/571500824",
      xiaohongshu: "",
      skland: "https://www.skland.com/profile?id=7932577420418",
      github: "https://github.com/EIHRTeam"
    }
  },
  footer: {
    nav: "网站导航",
    quickLinks: "快捷链接",
    quickLinksItems: [
      { label: "成就跟踪器", url: "https://medal.eihrteam.org" },
      { label: "INTEGRATED ICON SYSTEM", url: "https://iis.eihrteam.org" },
      { label: "ASR Platform", url: "https://asr.eihrteam.org" },
    ],
    friendLinks: "友情链接",
    friendLinksItems: [
      { label: "明日方舟：终末地 官网", url: "https://endfield.hypergryph.com/" },
      { label: "PRTS Wiki", url: "https://prts.wiki/" },
      { label: "森空岛 Wiki", url: "https://wiki.skland.com/endfield" },
    ],
    copyright: `© ${new Date().getFullYear()} Endfield Industries Human Resource Team. All Rights Reserved.`,
  }
};