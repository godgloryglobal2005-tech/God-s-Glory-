import React, { useState } from 'react';
import logoImg from '../../src/assets/images/gods_glory_logo_pro_1790221411839.jpg';

interface AppIconProps {
  className?: string;
  alt?: string;
  onClick?: () => void;
  showText?: boolean;
}

const AppIcon: React.FC<AppIconProps> = ({ 
  className = "w-12 h-12", 
  alt = "God's Glory Tutors Logo",
  onClick 
}) => {
  const [imgSrc, setImgSrc] = useState<string>(logoImg);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (imgSrc !== '/logo.jpg') {
      setImgSrc('/logo.jpg');
    } else {
      setHasError(true);
    }
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border-2 border-amber-400/90 bg-gradient-to-br from-blue-950 via-slate-900 to-amber-950 transition-all duration-300 group select-none ring-2 ring-amber-300/30 ${className}`}
      onClick={onClick}
    >
      {!hasError ? (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-gradient-to-br from-blue-900 via-indigo-950 to-amber-900 text-amber-300">
          <svg className="w-2/3 h-2/3 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
            <path d="M6 14h6" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="opacity-40" />
          </svg>
          <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase">GGT</span>
        </div>
      )}
    </div>
  );
};

export default AppIcon;
