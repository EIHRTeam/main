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
        <div className="mb-12">
          <img src={colorBar} alt="" className="h-3 w-auto object-contain" />
        </div>
        <div className="grid md:grid-cols-2 gap-8 border-l-4 border-black pl-8">
          <h2 className="text-3xl font-bold flex items-center gap-4">
              <span className="w-4 h-4 bg-brand rounded-none rotate-45"></span>
              {content.title}
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              {content.description}
            </p>
          </div>
      </GlitchElement>
    </Section>
  );
};

export default About;