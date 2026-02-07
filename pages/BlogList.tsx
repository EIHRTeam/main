import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import GlitchElement from '../components/GlitchElement';
import { ContentData, Language, ApiPost } from '../types';
import { fetchPosts } from '../services/blog';

// 默认页面标题
const DEFAULT_TITLE = 'EIHR Team // 终末地工业人事部';

interface BlogListProps {
  content: ContentData['blog'];
  navContent: ContentData['nav'];
  lang: Language;
  setLang: (lang: Language) => void;
  scrollToSection: (id: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ content, navContent, lang, setLang, scrollToSection }) => {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 设置页面标题
  useEffect(() => {
    document.title = `${content.title} | EIHR Team`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [content.title]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(lang);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError(content.loadError);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [content.loadError, lang]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        content={navContent} 
        scrollToSection={scrollToSection} 
      />
      <div className="pt-12 pb-20">
      <Section id="blog-list">
        <GlitchElement>
          <div className="mb-16 border-b border-black pb-8">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
              {content.title} <span className="text-gray-300">/ ARCHIVE</span>
            </h1>
          </div>
        </GlitchElement>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-sm text-gray-500">{content.loading}</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 font-mono">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
            >
              {content.retry}
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 font-mono">{content.noPosts}</div>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post, idx) => (
               <GlitchElement key={post.id} delay={idx * 0.05}>
                  <Link to={`/blog/${post.id}`} className="block group relative bg-white border border-black p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1">
                     <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                        <div className="flex-grow">
                           <div className="font-mono text-sm text-gray-500 mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 bg-brand inline-block"></span>
                              {post.date}
                           </div>
                           <h2 className="text-2xl font-bold mb-4 group-hover:text-brand-darker">{post.title}</h2>
                           <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                           {post.tags && post.tags.length > 0 && (
                             <div className="flex flex-wrap gap-2 mt-4">
                               {post.tags.map((tag) => (
                                 <span 
                                   key={tag} 
                                   className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-mono"
                                 >
                                   #{tag}
                                 </span>
                               ))}
                             </div>
                           )}
                        </div>
                        <div className="flex-shrink-0 pt-2">
                          <span className="font-mono text-xs font-bold uppercase border-b-2 border-brand pb-1">
                            {content.readMore}
                          </span>
                        </div>
                     </div>
                  </Link>
               </GlitchElement>
            ))}
          </div>
        )}
      </Section>
      </div>
    </div>
  );
};

export default BlogList;
