import React from 'react';
import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import GlitchElement from '../components/GlitchElement';
import colorBar from '../assets/color-bar.png';

const NotFound: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-white text-black flex flex-col items-center justify-between overflow-hidden">
        {/* Top Color Bar */}
        <div className="w-full h-3 md:h-6 bg-repeat-x" style={{ backgroundImage: `url(${colorBar})`, backgroundSize: 'contain' }}></div>

        <div className="flex-grow flex flex-col items-center justify-center p-8 z-10 w-full max-w-4xl relative">
            <GlitchElement>
                <div className="relative mb-8">
                    <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-black select-none relative z-10">
                        404
                    </h1>
                     <div className="absolute top-0 left-0 w-full h-full text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-brand opacity-60 translate-x-[4px] translate-y-[4px] pointer-events-none z-0">
                        404
                    </div>
                </div>
            </GlitchElement>

            <GlitchElement delay={0.2}>
                <div className="flex items-center gap-4 mb-12">
                     <span className="w-12 h-[2px] bg-black"></span>
                     <h2 className="text-xl md:text-2xl font-mono tracking-widest uppercase text-red-600 font-bold">
                        SIGNAL_LOST
                     </h2>
                     <span className="w-12 h-[2px] bg-black"></span>
                </div>
            </GlitchElement>
            
             <GlitchElement delay={0.4}>
                <div className="text-center max-w-md mb-16 space-y-4">
                    <p className="text-gray-800 font-bold font-sans text-lg">
                        您正尝试访问的页面不存在或已被删除，请检查您输入的地址是否正确。
                    </p>
                    <p className="text-gray-500 text-sm">
                        如您通过我们提供的连接来到此页面，请联系 <a href="mailto:staff@eihrteam.org">staff@eihrteam.org</a> 获取支持。
                        <br></br>如您通过其它网站中的链接来到此页面，请通知对应网站的管理员。
                    </p>
                </div>
            </GlitchElement>

            <GlitchElement delay={0.6}>
                 <Link 
                  to="/" 
                  className="group relative px-8 py-4 bg-black text-white text-sm uppercase tracking-widest overflow-hidden hover:text-black transition-colors duration-300 inline-block border border-black"
                >
                  <span className="relative z-10">返回首页</span>
                 <Undo2 className="w-4 h-4 ml-2 inline-block transition-transform duration-300 group-hover:-translate-x-1" />
                  <div className="absolute inset-0 bg-brand translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></div>
                </Link>
            </GlitchElement>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-[0.03] -z-10" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                 }}>
            </div>
        </div>

         {/* Bottom Color Bar - Rotated */}
        <div className="w-full h-3 md:h-6 bg-repeat-x rotate-180" style={{ backgroundImage: `url(${colorBar})`, backgroundSize: 'contain' }}></div>
    </div>
  );
};

export default NotFound;

