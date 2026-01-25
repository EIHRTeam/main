import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import GlitchElement from '../components/GlitchElement';
import { ContentData, Language } from '../types';
import { X } from 'lucide-react';

interface BlogPostProps {
  content: ContentData['blog'];
  navContent: ContentData['nav'];
  lang: Language;
  setLang: (lang: Language) => void;
  scrollToSection: (id: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ content, navContent, lang, setLang, scrollToSection }) => {
  const { id } = useParams<{ id: string }>();
  const post = content.posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
           <h1 className="text-4xl font-bold mb-4">404 // DATA_NOT_FOUND</h1>
           <Link to="/blog" className="text-blue-600 underline hover:text-blue-800">Return to Archive</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        content={navContent} 
        scrollToSection={scrollToSection} 
      />
      
      <div className="pt-32 pb-20 max-w-5xl mx-auto px-6 md:px-12">
        <GlitchElement>
            <div className="mb-8">
                {/* Meta Row */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-gray-200 text-gray-600 px-3 py-1 text-sm font-bold font-sans uppercase">
                        LOGS
                    </span>
                    <span className="text-gray-400 font-mono text-sm">
                        {post.date}
                    </span>
                </div>

                {/* Title & Close Row */}
                <div className="flex justify-between items-start gap-8">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
                        {post.title}
                    </h1>
                    <Link 
                      to="/blog" 
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                      aria-label="Close"
                    >
                        <X size={40} className="text-black" />
                    </Link>
                </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-300 mb-12" />

            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:uppercase prose-a:text-brand-dark prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono font-sans text-gray-800">
                <ReactMarkdown>{post.content || post.excerpt}</ReactMarkdown>
            </div>
            
            {/* Bottom Decoration */}
            <div className="mt-20 border-t border-dashed border-gray-200 pt-8 flex justify-between items-end opacity-50">
               <div className="w-8 h-8 border border-gray-400 flex flex-col justify-center gap-1 p-1">
                  <div className="w-4 h-px bg-gray-400"></div>
                  <div className="w-full h-px bg-gray-400"></div>
                  <div className="w-3 h-px bg-gray-400"></div>
               </div>
            </div>
        </GlitchElement>
      </div>
    </div>
  );
};

export default BlogPost;