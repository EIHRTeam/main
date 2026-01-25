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
        <div className="flex gap-12">
           {/* Vertical Color Bar - Repeating to show full pattern */}
           <div 
             className="hidden md:block w-4 flex-shrink-0 mt-2"
             style={{ 
               backgroundImage: `url(${colorBar})`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'contain',
               backgroundPosition: 'top center'
             }}
           />
           
           <div className="grid md:grid-cols-2 gap-8 pl-4 md:pl-0 border-l-4 border-black md:border-none">
            {/* Mobile shows border-l, Desktop shows image bar */}
             <div>
              <h2 className="text-3xl font-bold flex items-center gap-4">
                <span className="w-4 h-4 bg-brand rounded-none rotate-45"></span>
                {content.title}
              </h2>
             </div>
             <div>
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                {content.description}
              </p>
             </div>
           </div>
        </div>
      </GlitchElement>
    </Section>
  );
};

export default About;