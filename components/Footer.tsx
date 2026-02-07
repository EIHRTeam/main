import React from 'react';
import { Zap } from 'lucide-react';
import { ContentData } from '../types';

interface FooterProps {
  content: ContentData['footer'];
  navLabels: ContentData['nav'];
  scrollToSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ content, navLabels, scrollToSection }) => {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand flex items-center justify-center rounded-sm">
              <Zap size={16} fill="black" stroke="black" />
            </div>
            <span className="font-bold tracking-tighter text-lg">{navLabels.logo_full}</span>
          </div>
          <div className="text-xs text-gray-500 font-mono mt-4">
            {content.copyright}
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-bold mb-6 text-brand font-sans uppercase tracking-wider text-sm">{content.nav}</h4>
          <ul className="space-y-3 text-sm text-gray-400 font-sans">
            <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">{navLabels.home}</button></li>
            <li><button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">{navLabels.projects}</button></li>
            <li><button onClick={() => scrollToSection('blog')} className="hover:text-white transition-colors">{navLabels.blog}</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">{navLabels.contact}</button></li>
            <li><a href="https://eihrteam.org/blog/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{navLabels.copyright_statement}</a></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-bold mb-6 text-brand font-sans uppercase tracking-wider text-sm">{content.quickLinks}</h4>
          <ul className="space-y-3 text-sm text-gray-400 font-sans">
            {content.quickLinksItems.map((link) => (
              <li key={`${link.label}-${link.url}`}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Friendly Links Column */}
        <div>
          <h4 className="font-bold mb-6 text-brand font-sans uppercase tracking-wider text-sm">{content.friendLinks}</h4>
          <ul className="space-y-3 text-sm text-gray-400 font-sans">
            {content.friendLinksItems.map((link) => (
              <li key={`${link.label}-${link.url}`}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;