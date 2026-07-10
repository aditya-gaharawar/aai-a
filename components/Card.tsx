import React, { useRef, useState } from 'react';
import { CardData } from '../types';
import { ArrowRightIcon } from './icons';

const CodeLine: React.FC<{ line: string }> = ({ line }) => {
    const numberMatch = line.match(/^(\d+)\s/);
    const lineNumber = numberMatch ? numberMatch[1] : '';
    const code = numberMatch ? line.substring(lineNumber.length).trim() : line;

    const renderCode = () => {
        let coloredCode = code;
        const keywords = ['from', 'import', 'client', 'model', 'messages', 'role', 'content'];
        const strings = code.match(/"(.*?)"/g) || [];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            coloredCode = coloredCode.replace(regex, `<span class="text-cyan-600 dark:text-cyan-400 font-semibold">${keyword}</span>`);
        });

        strings.forEach(str => {
             coloredCode = coloredCode.replace(str, `<span class="text-green-600 dark:text-green-400">${str}</span>`);
        });

        return <span dangerouslySetInnerHTML={{ __html: coloredCode }} />;
    };

    return (
        <div className="flex text-sm">
            <span className="w-8 text-gray-400 dark:text-gray-500 text-right pr-4 select-none">{lineNumber}</span>
            <span className="flex-1 text-gray-800 dark:text-gray-300">{renderCode()}</span>
        </div>
    );
};

interface TiltProps {
    children: React.ReactNode;
    className?: string;
}

const TiltCard: React.FC<TiltProps> = ({ children, className }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [glow, setGlow] = useState('opacity-0');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on cursor position relative to center
        // Limit max rotation to 3 degrees for subtlety
        const rotateX = ((y - centerY) / centerY) * -3; 
        const rotateY = ((x - centerX) / centerX) * 3;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
        
        // Update glow position
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        (cardRef.current as any).style.setProperty('--glow-x', `${glowX}%`);
        (cardRef.current as any).style.setProperty('--glow-y', `${glowY}%`);
        setGlow('opacity-100');
    };

    const handleMouseLeave = () => {
        setTransform('');
        setGlow('opacity-0');
    };

    return (
        <div 
            ref={cardRef}
            className={`relative transition-all duration-200 ease-out preserve-3d shadow-xl dark:shadow-none ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
        >
             <div 
                className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),rgba(0,0,0,0.05),transparent_80%)] dark:bg-[radial-gradient(circle_at_var(--glow-x)_var(--glow-y),rgba(255,255,255,0.1),transparent_80%)] ${glow}`}
            />
            {children}
        </div>
    );
};


export const Card: React.FC<CardData & { layout?: 'default' | 'horizontal' }> = ({
  category,
  date,
  title,
  imageUrl,
  bgColor = 'bg-white dark:bg-gray-900',
  textColor = 'text-gray-900 dark:text-white',
  logo,
  codeSnippet,
  linkText,
  layout = 'default',
}) => {
  if (layout === 'horizontal') {
    return (
      <TiltCard className={`flex-shrink-0 w-[300px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden group border border-gray-100 dark:border-gray-800 ${textColor} ${!imageUrl ? `${bgColor} dark:bg-gradient-to-br from-gray-800/80 to-gray-900/90` : ''}`}>
        {imageUrl && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </>
        )}
        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="text-sm">
              <p className={`font-semibold ${imageUrl ? 'text-white' : ''}`}>{category}</p>
              {date && <p className={`opacity-80 ${imageUrl ? 'text-gray-200' : ''}`}>{date}</p>}
            </div>
            {linkText !== "" && (
               <div className={`w-8 h-8 rounded-full flex items-center justify-center -mr-2 -mt-2 transition-colors duration-300 ${imageUrl ? 'bg-white/10 group-hover:bg-white text-white group-hover:text-black' : 'bg-black/5 dark:bg-white/10 group-hover:bg-black dark:group-hover:bg-white text-black dark:text-white group-hover:text-white dark:group-hover:text-black'}`}>
                   <ArrowRightIcon className="w-4 h-4 transition-colors"/>
              </div>
            )}
          </div>

          {/* Middle/Logo Section */}
          {logo && <div className="flex-grow flex items-center justify-center">{logo}</div>}

          {/* Code Snippet Section */}
          {codeSnippet && (
              <div className="flex-grow flex items-center justify-center font-mono text-left text-xs bg-gray-50 dark:bg-black/60 backdrop-blur-md rounded-lg p-4 my-4 -mx-2 border border-gray-200 dark:border-white/10 shadow-inner">
                  <pre className="max-h-full overflow-y-auto"><code>{codeSnippet.code.split('\n').map((line, i) => <CodeLine key={i} line={line} />)}</code></pre>
              </div>
          )}
          
          {/* Bottom Section */}
          <div className={`mt-auto ${logo ? 'text-center' : ''} pt-4`}>
            <h3 className={`text-xl font-semibold leading-tight ${imageUrl ? 'text-white' : ''}`}>{title}</h3>
            {linkText && <span className="text-sm font-semibold mt-2 inline-block">{linkText}</span>}
          </div>
        </div>
      </TiltCard>
    );
  }
  
  // Vertical / Default Card Content
  return (
    <div className="aspect-[4/5] md:aspect-[3/4]">
       <TiltCard className={`h-full w-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between group border border-gray-100 dark:border-gray-800 ${textColor} ${!imageUrl ? `${bgColor} dark:bg-gradient-to-br from-gray-800 to-gray-900` : ''}`}>
        {imageUrl && (
            <>
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
        )}

        <div className="relative z-10 flex flex-col h-full">
            {/* Top Section */}
            <div className="flex justify-between items-start">
            <div className="text-sm">
                <p className={`font-semibold ${imageUrl ? 'text-white' : ''}`}>{category}</p>
                {date && <p className={`opacity-80 ${imageUrl ? 'text-gray-200' : ''}`}>{date}</p>}
            </div>
            {linkText !== "" && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center -mr-2 -mt-2 transition-colors duration-300 ${imageUrl ? 'bg-white/10 group-hover:bg-white text-white group-hover:text-black' : 'bg-black/5 dark:bg-white/10 group-hover:bg-black dark:group-hover:bg-white text-black dark:text-white group-hover:text-white dark:group-hover:text-black'}`}>
                    <ArrowRightIcon className="w-4 h-4 transition-colors"/>
                </div>
            )}
            </div>

            {/* Middle/Logo Section */}
            {logo && <div className="flex-grow flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">{logo}</div>}
            
            {/* Bottom Section */}
            <div className={`mt-auto ${logo ? 'text-center' : ''}`}>
            <h3 className={`text-2xl font-semibold leading-tight ${imageUrl ? 'text-white' : ''}`}>{title}</h3>
            {linkText && <span className="text-sm font-semibold mt-2 inline-block border-b border-transparent group-hover:border-current transition-colors">{linkText}</span>}
            </div>
        </div>
      </TiltCard>
    </div>
  );
};
