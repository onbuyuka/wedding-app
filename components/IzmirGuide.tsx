import React, { useState } from 'react';
import { CONTENT } from '../constants';
import GuideMap from './GuideMap';

interface IzmirGuideProps {
  content: typeof CONTENT.en;
  onBack: () => void;
}

interface GuideRowItem {
  name: string;
  description: string;
  whereName: string;
  mapLink: string;
  image: string;
  imageAlt: string;
  sinceYear?: string;
  coords?: [number, number];
}

interface GuideRowProps {
  item: GuideRowItem;
  index: number;
  sinceLabel: string;
  whereLabel: string;
}

const GuideRow: React.FC<GuideRowProps> = ({ item, index, sinceLabel, whereLabel }) => {
  const imageOnRight = index % 2 === 1;
  return (
    <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 border-b border-stone-200 last:border-b-0">
      <div className={`overflow-hidden rounded-xl shadow-lg aspect-[4/3] bg-stone-100 ${imageOnRight ? 'md:order-2' : ''}`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-stone-100 via-rose-50 to-stone-200">
            <svg className="w-10 h-10 text-stone-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="font-serif text-stone-500 text-lg leading-snug">{item.imageAlt}</p>
          </div>
        )}
      </div>
      <div className={`${imageOnRight ? 'md:order-1' : ''}`}>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h3 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight">{item.name}</h3>
          {item.sinceYear && (
            <span className="text-xs uppercase tracking-widest text-rose-500 border border-rose-200 rounded-full px-3 py-1">
              {sinceLabel} {item.sinceYear}
            </span>
          )}
        </div>
        <p className="text-stone-600 text-lg leading-relaxed font-light mb-5">{item.description}</p>
        <p className="text-sm text-stone-500">
          <span className="uppercase tracking-wider text-xs text-stone-400 mr-2">{whereLabel}:</span>
          <a
            href={item.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:text-rose-800 underline underline-offset-4 decoration-rose-200 hover:decoration-rose-500 transition-colors"
          >
            {item.whereName}
          </a>
        </p>
      </div>
    </article>
  );
};

interface GuideSectionProps {
  title: string;
  subtitle: string;
  items: GuideRowItem[];
  bg: string;
  sinceLabel: string;
  whereLabel: string;
  openInMapsLabel: string;
  mapHint: string;
  /** Marker accent color. */
  accent?: string;
  /** Optional explicit map center (used when items span very different regions). */
  mapCenter?: [number, number];
  mapZoom?: number;
  /** Render the interactive map above the cards. Defaults to true. */
  showMap?: boolean;
}

const GuideSection: React.FC<GuideSectionProps> = ({
  title,
  subtitle,
  items,
  bg,
  sinceLabel,
  whereLabel,
  openInMapsLabel,
  mapHint,
  accent,
  mapCenter,
  mapZoom,
  showMap = true,
}) => (
  <section className={`${bg} py-20`}>
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">{title}</h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto font-light italic">{subtitle}</p>
      </div>

      {showMap && (
        <div className="mb-16 -mx-2 md:mx-0">
          <GuideMap
            items={items}
            accent={accent}
            center={mapCenter}
            zoom={mapZoom}
            whereLabel={whereLabel}
            openInMapsLabel={openInMapsLabel}
            sinceLabel={sinceLabel}
          />
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-stone-400 mt-4">{mapHint}</p>
        </div>
      )}

      <div>
        {items.map((item, idx) => (
          <GuideRow
            key={`${title}-${idx}`}
            item={item}
            index={idx}
            sinceLabel={sinceLabel}
            whereLabel={whereLabel}
          />
        ))}
      </div>
    </div>
  </section>
);

const IzmirGuide: React.FC<IzmirGuideProps> = ({ content }) => {
  const { guide } = content;
  const [activeTab, setActiveTab] = useState<'food' | 'places' | 'dayTrips'>('food');

  const tabs: { key: 'food' | 'places' | 'dayTrips'; label: string }[] = [
    { key: 'food', label: guide.food.title },
    { key: 'places', label: guide.places.title },
    { key: 'dayTrips', label: guide.dayTrips.title },
  ];

  const sectionProps = {
    food: { items: guide.food.items, title: guide.food.title, subtitle: guide.food.subtitle, accent: '#e11d48', showMap: true },
    places: { items: guide.places.items, title: guide.places.title, subtitle: guide.places.subtitle, accent: '#0f766e', showMap: true },
    dayTrips: { items: guide.dayTrips.items, title: guide.dayTrips.title, subtitle: guide.dayTrips.subtitle, accent: '#b45309', showMap: false },
  } as const;

  const active = sectionProps[activeTab];

  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <header className="bg-gradient-to-b from-rose-50 to-stone-50 pt-32 pb-12 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-6">{guide.title}</h1>
          <p className="text-stone-600 text-xl font-light leading-relaxed">{guide.subtitle}</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-stone-50/90 backdrop-blur border-b border-stone-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex justify-center gap-2 md:gap-4 py-4 flex-wrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 md:px-8 py-2.5 text-xs md:text-sm uppercase tracking-widest transition-colors rounded-full border ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-300 hover:border-stone-900 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <GuideSection
        key={activeTab}
        title={active.title}
        subtitle={active.subtitle}
        items={active.items}
        bg="bg-white"
        sinceLabel={guide.sinceLabel}
        whereLabel={guide.whereLabel}
        openInMapsLabel={guide.openInMaps}
        mapHint={guide.mapHint}
        accent={active.accent}
        showMap={active.showMap}
      />
    </div>
  );
};

export default IzmirGuide;
