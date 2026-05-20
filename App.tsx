import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import Menu from './components/Menu';
import RSVP from './components/RSVP';
import PhotoUpload from './components/PhotoUpload';
import IzmirGuide from './components/IzmirGuide';
import { CONTENT } from './constants';

const getInitialLanguage = (): 'en' | 'tr' => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  return browserLang.toLowerCase().startsWith('tr') ? 'tr' : 'en';
};

const isGuideHash = () =>
  typeof window !== 'undefined' && window.location.hash.toLowerCase().startsWith('#/guide');

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'tr'>(getInitialLanguage);
  const [isGuidePage, setIsGuidePage] = useState<boolean>(isGuideHash);

  useEffect(() => {
    const onHashChange = () => {
      setIsGuidePage(isGuideHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const content = CONTENT[lang];

  const goHome = useCallback(() => {
    if (window.location.hash) {
      window.location.hash = '';
    } else {
      setIsGuidePage(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const goGuide = useCallback(() => {
    window.location.hash = '#/guide';
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'tr' : 'en');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-rose-200">
      
      {/* Sticky Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/50 shadow-sm h-16 flex items-center">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); goHome(); }} className="text-xl font-serif font-bold tracking-tight text-stone-800 cursor-pointer">
             {content.couple.partner1.charAt(0)} & {content.couple.partner2.charAt(0)}
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider text-stone-500 items-center">
            {isGuidePage ? (
              <a href="#" onClick={(e) => { e.preventDefault(); goHome(); }} className="hover:text-rose-500 transition-colors">{content.guide.backToWedding}</a>
            ) : (
              <>
                <a href="#details" className="hover:text-rose-500 transition-colors">{content.nav.details}</a>
                <a href="#rsvp" className="hover:text-rose-500 transition-colors">{content.nav.rsvp}</a>
                <a href="#upload" className="hover:text-rose-500 transition-colors">{content.nav.upload}</a>
                <a href="#/guide" onClick={() => closeMobileMenu()} className="hover:text-rose-500 transition-colors">{content.nav.guide}</a>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors border border-stone-300 rounded-full px-3 py-1"
            >
              <span className={lang === 'en' ? 'text-rose-500' : ''}>EN</span>
              <span className="text-stone-300">|</span>
              <span className={lang === 'tr' ? 'text-rose-500' : ''}>TR</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-stone-100 shadow-xl md:hidden animate-fade-in">
          <div className="flex flex-col p-6 gap-6 text-center text-stone-600 font-medium uppercase tracking-wider">
            {isGuidePage ? (
              <a href="#" onClick={(e) => { e.preventDefault(); closeMobileMenu(); goHome(); }} className="hover:text-rose-500 transition-colors">{content.guide.backToWedding}</a>
            ) : (
              <>
                <a href="#details" onClick={closeMobileMenu} className="hover:text-rose-500 transition-colors">{content.nav.details}</a>
                <a href="#rsvp" onClick={closeMobileMenu} className="hover:text-rose-500 transition-colors">{content.nav.rsvp}</a>
                <a href="#upload" onClick={closeMobileMenu} className="hover:text-rose-500 transition-colors">{content.nav.upload}</a>
                <a href="#/guide" onClick={closeMobileMenu} className="hover:text-rose-500 transition-colors">{content.nav.guide}</a>
              </>
            )}
          </div>
        </div>
      )}

      <main>
        {isGuidePage ? (
          <IzmirGuide content={content} onBack={goHome} />
        ) : (
          <>
            <Hero content={content} />
            <InfoSection content={content} />
            <Menu content={content} />
            <RSVP content={content} />
            <PhotoUpload content={content} />

            {/* Izmir Guide CTA */}
            <section className="bg-rose-50 py-16">
              <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">{content.guide.ctaTitle}</h2>
                <p className="text-stone-600 mb-8 max-w-2xl mx-auto">{content.guide.ctaText}</p>
                <button
                  onClick={goGuide}
                  className="inline-flex items-center gap-3 bg-stone-800 text-white font-semibold py-4 px-8 rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {content.guide.ctaButton}
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 text-center text-sm">
        <p className="font-serif italic text-lg text-stone-300 mb-2">
           {content.couple.partner1} & {content.couple.partner2}
        </p>
        <p className="uppercase tracking-widest text-xs">{content.hero.date}</p>
      </footer>
    </div>
  );
};

export default App;