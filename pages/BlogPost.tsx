import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { AnimatePresence, m } from 'framer-motion';
import GlitchElement from '../components/GlitchElement';
import { ContentData, ApiPostDetail } from '../types';
import { fetchPost } from '../services/blog';
import { X, Share2, Link as LinkIcon, Printer, Check } from 'lucide-react';

// 默认页面标题
const DEFAULT_TITLE = 'EIHR Team // 终末地工业人事部';

interface BlogPostProps {
  content: ContentData['blog'];
}

// ShareMenu Component
const ShareMenu: React.FC<{ content: ContentData['blog'] }> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-black hover:bg-black hover:text-white transition-colors group"
        aria-label={content.share}
      >
        <Share2 size={18} strokeWidth={1.5} />
        <span className="font-mono text-sm uppercase tracking-wider hidden sm:inline group-hover:text-white">{content.share}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 origin-top-right"
          >
            <div className="py-1 font-mono">
              <button 
                onClick={() => { handleShare(); setIsOpen(false); }} 
                className="w-full text-left px-4 py-3 text-sm hover:bg-brand hover:text-black flex items-center gap-3 transition-colors border-b border-gray-100"
              >
                <Share2 size={16} />
                {content.shareMenu.system}
              </button>
              <button 
                onClick={handleCopy} 
                className="w-full text-left px-4 py-3 text-sm hover:bg-brand hover:text-black flex items-center gap-3 transition-colors border-b border-gray-100"
              >
                {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                {copied ? content.shareMenu.copied : content.shareMenu.copy}
              </button>
              <button 
                onClick={() => { handlePrint(); setIsOpen(false); }} 
                className="w-full text-left px-4 py-3 text-sm hover:bg-brand hover:text-black flex items-center gap-3 transition-colors"
              >
                <Printer size={16} />
                {content.shareMenu.print}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<ApiPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchPost(id);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load post:', err);
        if (err instanceof Error && err.message === 'Post not found') {
          setError('not_found');
        } else {
          setError(content.loadPostError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, content.loadPostError]);

  // 动态设置页面标题
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | EIHR Team`;
    }
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm text-gray-500">{content.loading}</span>
        </div>
      </div>
    );
  }

  if (error === 'not_found' || !post) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">{content.notFoundTitle}</h1>
           <p className="text-gray-500 mb-8 font-mono">{content.notFoundDesc}</p>
           <Link to="/blog" className="text-blue-600 underline hover:text-blue-800">{content.returnToArchive}</Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">ERROR</h1>
           <p className="text-red-500 mb-8 font-mono">{error}</p>
           <button 
             onClick={() => window.location.reload()} 
             className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
           >
             {content.retry}
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-brand">
      <div className="max-w-6xl mx-auto px-8 md:px-24 py-20 md:py-32 print:p-0 print:max-w-none">
        <GlitchElement>
            {/* Top Meta Row */}
            <div className="flex items-center gap-4 mb-6 print:mb-4">
                <span className="bg-[#EAEAEA] text-[#666666] px-3 py-1 text-xs font-bold tracking-wider print:border print:border-gray-300 print:bg-transparent">
                    NOTICES
                </span>
                <span className="text-[#999999] font-mono text-sm tracking-tight print:text-black">
                    {post.date}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 print:hidden">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-brand/20 text-black text-xs font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
            </div>

            {/* Title & Close Row */}
            <div className="flex justify-between items-start gap-12 mb-8 print:mb-4 print:block">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black font-sans leading-[1.1] print:text-3xl">
                    {post.title}
                </h1>
                
                <div className="flex items-start gap-4 pt-1 print:hidden">
                  <ShareMenu content={content} />
                  <Link 
                    to="/blog" 
                    className="text-black hover:opacity-60 transition-opacity"
                    aria-label="Close"
                  >
                      <X size={42} strokeWidth={1.5} />
                  </Link>
                </div>
            </div>

            {/* Subtle Divider */}
            <div className="h-[1px] bg-[#EAEAEA] w-full mb-16 print:mb-8 print:bg-black" />

            {/* Content Area - Markdown with full support */}
            <article className="prose prose-lg max-w-none 
              prose-headings:text-black prose-headings:font-bold 
              prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[#333333] prose-p:leading-relaxed 
              prose-blockquote:border-l-4 prose-blockquote:border-gray-800 prose-blockquote:bg-gray-50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-gray-700
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#1e1e1e] prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:shadow-lg
              prose-a:text-blue-600 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-blue-800
              prose-strong:text-black
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-[#333333] prose-li:marker:text-gray-800
              prose-table:border-collapse prose-table:w-full
              prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-bold
              prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
              prose-hr:border-gray-300 prose-hr:my-12
              prose-img:rounded-lg prose-img:shadow-md
              font-sans
              print:prose-p:text-black print:prose-li:text-black">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {post.content}
                </ReactMarkdown>
            </article>
            
            {/* Specific Bottom Left Decoration from screenshot */}
            <div className="mt-32 opacity-20 print:hidden">
               <div className="w-10 h-10 border border-black flex flex-col justify-center items-center gap-1.5 p-2">
                  <div className="w-5 h-[1.5px] bg-black"></div>
                  <div className="w-5 h-[1.5px] bg-black"></div>
                  <div className="w-3 h-[1.5px] bg-black self-start"></div>
               </div>
            </div>
        </GlitchElement>
      </div>
    </div>
  );
};

export default BlogPost;