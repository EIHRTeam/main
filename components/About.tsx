import React from 'react';
import GlitchElement from './GlitchElement';
import Section from './Section';
import { ContentData } from '../types';
import colorBar from '../assets/color-bar.1f0aa038.png';

interface AboutProps {
  content: ContentData['about'];
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <Section id="about" className="pt-20">
      <GlitchElement>
        <div className="relative pl-10">
          {/* Vertical Color Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 overflow-hidden">
            <img 
              src={colorBar} 
              alt="" 
              className="h-full w-auto max-w-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover" 
              style={{ minWidth: '1000%' }} // Ensure it covers the height when rotated
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <h2 className="text-3xl font-bold flex items-center gap-4">
              <span className="w-4 h-4 bg-brand rounded-none rotate-45"></span>
              {content.title}
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              {content.description}
            </p>
          </div>
        </div>
      </GlitchElement>
    </Section>
  );
};

export default About;