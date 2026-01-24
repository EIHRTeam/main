import { ContentData } from '../types';

export const en: ContentData = {
  nav: {
    home: "HOME",
    projects: "PROJECTS",
    projects_short: "PROJ",
    blog: "BLOG",
    blog_short: "BLOG",
    contact: "CONTACT",
    logo_full: "EIHR Team",
    logo_short: "EIHR",
  },
  hero: {
    title1: "ULTIMATE",
    title2: "STRATEGY",
    subtitle: "We are a specialized team dedicated to hardcore raid analysis and game data mining.",
    cta: "JOIN US",
    stat1_label: "Deep Guides",
    stat2_label: "Contributors",
  },
  about: {
    title: "// ABOUT US",
    description: "Founded in 2020, providing players with the most accurate and hardcore game data analysis. We believe data is the key to victory.",
  },
  projects: {
    title: "PROJECTS & RESOURCES",
    items: [
      { id: 1, title: "Dmg Calculator Pro", category: "TOOL", desc: "Real-time damage estimation based on the latest formulas." },
      { id: 2, title: "Raid Database", category: "WIKI", desc: "Over 500+ monster mechanics and drop data, updated daily." },
      { id: 3, title: "Build Simulator", category: "Web App", desc: "Visualize gear setups and share your builds instantly." },
    ],
  },
  blog: {
    title: "LATEST LOGS",
    readMore: "Read More",
    viewAll: "VIEW ALL LOGS",
    blogLink: "/blog",
    posts: [
      { id: 1, date: "2023.10.24", title: "V4.5 Update Mechanics Analysis", excerpt: "The new version brings not only new characters but also fundamental poise changes..." },
      { id: 2, date: "2023.10.15", title: "Abyss Floor 12 Full Star Guide", excerpt: "For the current high-pressure environment, we recommend these three teams..." },
    ],
  },
  contact: {
    title: "CONNECT",
    socials: "Social Media",
    email: "staff@eihrteam.org",
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
      { label: "Arknights Official", url: "https://ak.hypergryph.com/" },
      { label: "PRTS Wiki", url: "http://prts.wiki/" },
      { label: "GamePress", url: "https://gamepress.gg/arknights/" },
    ],
    copyright: "© 2024 Endfield Industry Human Resource Team. All Rights Reserved.",
  }
};