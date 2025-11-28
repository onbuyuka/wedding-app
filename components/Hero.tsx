import React from 'react';
import { CONTENT, HERO_IMAGE_URL } from '../constants';

interface HeroProps {
  content: typeof CONTENT.en;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const { couple, location } = content;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image - works on both mobile and desktop */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url("${HERO_IMAGE_URL}")`,
          backgroundPosition: 'center 60%',
          backgroundAttachment: 'scroll'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <p className="mb-4 text-sm md:text-lg font-light tracking-[0.2em] uppercase text-stone-200 animate-fade-in-up">
          {content.hero.intro}
        </p>
        <h1 className="mb-6 font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white drop-shadow-lg">
          {couple.partner1} <span className="font-light italic text-rose-200">&</span> {couple.partner2}
        </h1>
        <div className="mt-6 md:mt-8 flex flex-col items-center gap-2 font-light tracking-wide text-base md:text-xl">
          <p>{content.hero.date}</p>
          <div className="h-px w-12 bg-rose-300 my-2"></div>
          <p>{location.venue}</p>
        </div>
        
        <a 
          href="#rsvp" 
          className="mt-12 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white hover:text-stone-900"
        >
          {content.hero.cta}
        </a>
      </div>
    </div>
  );
};

export default Hero;