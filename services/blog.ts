import { ApiPost, ApiPostDetail } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * 获取博客文章列表
 */
export async function fetchPosts(lang: string = 'zh'): Promise<ApiPost[]> {
  const response = await fetch(`${API_BASE}/posts?lang=${lang}`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  return data.posts;
}

/**
 * 获取单篇博客文章
 */
export async function fetchPost(id: string, lang: string = 'zh'): Promise<ApiPostDetail> {
  const response = await fetch(`${API_BASE}/posts/${id}?lang=${lang}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found');
    }
    throw new Error('Failed to fetch post');
  }
  return response.json();
}

