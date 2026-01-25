import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import GlitchElement from './GlitchElement';
import Section from './Section';
import { ContentData } from '../types';
import colorBar from '../assets/color-bar.1f0aa038.png';

interface ProjectsProps {
  content: ContentData['projects'];
}

const Projects: React.FC<ProjectsProps> = ({ content }) => {
  return (
    <Section id="projects" className="bg-subtle/50 rounded-3xl my-10">
      <GlitchElement>
        <div className="mb-8">
          <img src={colorBar} alt="" className="w-full h-2 object-cover opacity-80" />
        </div>
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">{content.title}</h2>
          <span className="hidden md:block font-mono text-xs">/ INDEX_02</span>
        </div>
      </GlitchElement>

      <div className="grid md:grid-cols-3 gap-6">
        {content.items.map((item, idx) => (
          <GlitchElement key={item.id} delay={idx * 0.1}>
            <div className="group bg-white border border-black p-6 hover:bg-black hover:text-white transition-all duration-300 h-full flex flex-col justify-between rounded-bl-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs px-2 py-1 border border-brand text-black bg-brand">{item.category}</span>
                  <span className="font-mono text-xl text-gray-300 group-hover:text-gray-600">0{item.id}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400">{item.desc}</p>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="p-2 bg-gray-100 text-black rounded-full group-hover:bg-brand transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </GlitchElement>
        ))}
      </div>
    </Section>
  );
};

export default Projects;