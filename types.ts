export type Language = 'zh' | 'en';

// API 返回的博客文章类型
export interface ApiPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export interface ApiPostDetail extends ApiPost {
  content: string;
}

export interface ContentData {
  nav: {
    home: string;
    projects: string;
    projects_short: string;
    blog: string;
    blog_short: string;
    contact: string;
    logo_full: string;
    logo_short: string;
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    stat1_label: string;
    stat2_label: string;
  };
  about: {
    title: string;
    description: string;
  };
  projects: {
    title: string;
    items: {
      id: number;
      title: string;
      category: string;
      desc: string;
      link?: string;
    }[];
  };
  blog: {
    title: string;
    readMore: string;
    viewAll: string;
    blogLink: string;
    // i18n strings for blog pages
    loadError: string;
    loadPostError: string;
    noPosts: string;
    retry: string;
    loading: string;
    notFoundTitle: string;
    notFoundDesc: string;
    returnToArchive: string;
    share: string;
    shareMenu: {
      system: string;
      copy: string;
      print: string;
      copied: string;
    };
  };
  contact: {
    title: string;
    description: string;
    socials: string;
    email: string;
    socialLinks: {
      bilibili: string;
      xiaohongshu: string;
      skland: string;
      github: string;
    };
  };
  footer: {
    nav: string;
    quickLinks: string;
    quickLinksItems: {
      label: string;
      url: string;
    }[];
    friendLinks: string;
    friendLinksItems: {
      label: string;
      url: string;
    }[];
    copyright: string;
  }
}