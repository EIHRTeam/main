import { ContentData } from '../types';

export const en: ContentData = {
  nav: {
    home: "HOME",
    projects: "PROJECTS",
    projects_short: "PROJ",
    blog: "BLOG",
    blog_short: "BLOG",
    contact: "CONTACT",
    logo_full: "EIHRTeam",
    logo_short: "EIHR",
    copyright_statement: "COPYRIGHT",
  },
  hero: {
    title1: "ULTIMATE",
    title2: "STRATEGY",
    subtitle: "And we are?/n",
    cta: "FOLLOW US",
    stat1_label: "Deep Guides (Fake)",
    stat2_label: "Contributors (Also Fake)",
  },
  about: {
    title: "// ABOUT US",
    description: "Founded in 2025, forgot the middle, forgot the rest.",
  },
  projects: {
    title: "PROJECTS & RESOURCES",
    items: [
      { id: 1, title: "Medal Database", category: "TOOL", desc: "Comprehensive Endfield Medal Database.", link: "https://medal.eihrteam.org/" },
      { id: 2, title: "Stay Tuned", category: "Coming S∞n™", desc: "Hold on, let me panic first." },
      { id: 3, title: "Stay Tuned", category: "Coming S∞n™", desc: "Click to add text." },
    ],
  },
  blog: {
    title: "LATEST BLOGS",
    readMore: "Read More",
    viewAll: "VIEW ALL BLOGS",
    blogLink: "/blog",
    // i18n strings for blog pages
    loadError: "Failed to load posts",
    loadPostError: "Failed to load post",
    noPosts: "No posts available",
    retry: "Retry",
    loading: "LOADING DATA...",
    notFoundTitle: "404 // DATA_NOT_FOUND",
    notFoundDesc: "The requested post does not exist",
    returnToArchive: "Return to Archive",
    share: "SHARE",
    shareMenu: {
      system: "Share",
      copy: "Copy Link",
      print: "Print Page",
      copied: "Copied!",
    },
  },
  contact: {
    title: "CONNECT",
    description: "Whether you want to share your thoughts or just say hi, we are always welcome.",
    socials: "Social Media",
    email: "staff@eihrteam.org",
    socialLinks: {  
      bilibili: "https://space.bilibili.com/571500824",
      xiaohongshu: "",
      skland: "https://www.skland.com/profile?id=7932577420418",
      github: "https://github.com/EIHRTeam"
    }
  },
  footer: {
    nav: "NAVIGATION",
    quickLinks: "QUICK LINKS",
    quickLinksItems: [
      { label: "Achievement Database", url: "https://medal.eihrteam.org" },
      { label: "INTEGRATED ICON SYSTEM", url: "https://iis.eihrteam.org" },
      { label: "ASR Platform", url: "https://asr.eihrteam.org" },
    ],
    friendLinks: "FRIENDLY LINKS",
    friendLinksItems: [
      { label: "Endfield Official", url: "https://endfield.hypergryph.com/en" },
      { label: "PRTS Wiki", url: "https://prts.wiki/" },
      { label: "Skland Wiki", url: "https://wiki.skland.com/endfield" },
    ],
    copyright: `© ${new Date().getFullYear()} Endfield Industries Human Resource Team. All Rights Reserved.`,
  }
};