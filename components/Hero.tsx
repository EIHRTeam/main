import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import GlitchElement from './GlitchElement';
import Section from './Section';
import { ContentData } from '../types';

interface HeroProps {
  content: ContentData['hero'];
  scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ content, scrollToSection }) => {
  return (
    <Section id="home" className="min-h-[calc(100vh-5rem)] flex flex-col justify-center pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-2">
          <GlitchElement>
            <div className="inline-block px-2 py-1 bg-black text-brand font-mono text-xs mb-4">
              SYS.READY // V.0.0.2-alpha <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </div>
          </GlitchElement>

          <GlitchElement delay={0.1}>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9]">
              {content.title1}<br />
              <span className="bg-brand px-2 decoration-clone">{content.title2}</span>
            </h1>
          </GlitchElement>

          <GlitchElement delay={0.2}>
            <p className="mt-8 text-lg md:text-xl max-w-xl font-mono border-l-4 border-brand pl-4 text-gray-600">
              {content.subtitle}
            </p>
          </GlitchElement>

          <GlitchElement delay={0.3}>
            <div className="flex flex-wrap gap-4 mt-10">
              <button onClick={() => scrollToSection('contact')} className="group relative px-8 py-4 bg-black text-white font-bold overflow-hidden hover:text-brand transition-colors">
                <span className="relative z-10 flex items-center gap-2">
                  {content.cta} <ArrowUpRight size={20} />
                </span>
                <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300"></div>
              </button>
              <div className="flex gap-8 items-center px-6">
                <div>
                  <span className="block text-2xl font-bold font-mono">114514</span>
                  <span className="text-xs text-gray-500 uppercase">{content.stat1_label}</span>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div>
                  <span className="block text-2xl font-bold font-mono">8</span>
                  <span className="text-xs text-gray-500 uppercase">{content.stat2_label}</span>
                </div>
              </div>
            </div>
          </GlitchElement>
        </div>

        <div className="lg:col-span-4 relative">
          <GlitchElement delay={0.5}>
            <div className="relative w-full aspect-square border-2 border-black rounded-none rounded-tr-[4rem] p-4 flex items-center justify-center overflow-hidden bg-white/50 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-16 h-16 bg-brand rounded-bl-full"></div>
              <div className="w-full h-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-400">
                <span className="font-mono text-gray-400 text-xs tracking-widest">[ VISUAL_DATA_NULL ]</span>
              </div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-black"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-black"></div>
              <div className="absolute top-4 left-4 w-2 h-2 bg-black"></div>
            </div>
            <div className="mt-4 font-mono text-xs text-right">
              COORD: 34.052, 118.243
            </div>
          </GlitchElement>
        </div>
      </div>
    </Section>
  );
};

export default Hero;