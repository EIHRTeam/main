import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import { ContentData } from '../types';

interface HomeProps {
  content: ContentData;
  scrollToSection: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ content, scrollToSection }) => {
  return (
    <main>
        <Hero 
          content={content.hero} 
          scrollToSection={scrollToSection} 
        />
        <About content={content.about} />
        <Projects content={content.projects} />
        <Blog content={content.blog} />
        <Contact content={content.contact} />
    </main>
  );
};

export default Home;