import React from 'react';
import { Link } from 'react-router-dom';
import GlitchElement from './GlitchElement';
import Section from './Section';
import { ContentData } from '../types';

interface BlogProps {
  content: ContentData['blog'];
}

const Blog: React.FC<BlogProps> = ({ content }) => {
  return (
    <Section id="blog">
      <GlitchElement>
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-black flex-grow"></div>
          <h2 className="text-3xl font-bold uppercase tracking-wider bg-brand px-4 py-1">{content.title}</h2>
          <div className="h-px bg-black flex-grow"></div>
        </div>
      </GlitchElement>

      <div className="space-y-4">
        {content.posts.map((post, idx) => (
          <GlitchElement key={post.id} delay={idx * 0.1}>
            <div className="group relative bg-white border-l-4 border-gray-200 hover:border-brand pl-6 py-6 transition-all cursor-pointer">
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-2 font-mono text-sm text-gray-400">{post.date}</div>
                <div className="md:col-span-7">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-brand transition-colors">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-1">{post.excerpt}</p>
                </div>
                <div className="md:col-span-3 text-right">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 inline-block">
                    {content.readMore} -&gt;
                  </span>
                </div>
              </div>
            </div>
          </GlitchElement>
        ))}
      </div>

      <GlitchElement delay={0.3} className="mt-12 flex justify-center">
        <Link 
          to={content.blogLink}
          className="group relative px-8 py-4 bg-black text-white font-bold font-mono text-sm uppercase tracking-widest overflow-hidden hover:text-black transition-colors duration-300"
        >
          <span className="relative z-10">{content.viewAll}</span>
          <div className="absolute inset-0 bg-brand translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></div>
        </Link>
      </GlitchElement>
    </Section>
  );
};

export default Blog;