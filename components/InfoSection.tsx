import React from 'react';
import { CONTENT } from '../constants';

interface InfoSectionProps {
  content: typeof CONTENT.en;
}

const InfoSection: React.FC<InfoSectionProps> = ({ content }) => {
  const { info, location } = content;

  return (
    <section id="details" className="scroll-mt-24 py-20 bg-stone-50 text-stone-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4">{info.title}</h2>
          <p className="text-stone-500 italic">{info.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* When */}
          <div className="flex flex-col items-center p-6 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 flex items-center justify-center bg-rose-100 rounded-full mb-6 text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-2">{info.whenLabel}</h3>
            <p className="text-stone-600 mb-1 font-semibold">{info.date}</p>
            <p className="text-stone-500">{info.time}</p>
          </div>

          {/* Where */}
          <div className="flex flex-col items-center p-6 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 flex items-center justify-center bg-rose-100 rounded-full mb-6 text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-2">{info.whereLabel}</h3>
            <p className="text-stone-600 mb-1 font-semibold">{location.venue}</p>
            <p className="text-stone-500 mb-4">{location.address}</p>
            <a 
              href={location.mapLink}
              target="_blank" 
              rel="noreferrer"
              className="text-sm font-semibold text-rose-500 hover:text-rose-600 border-b border-rose-200 pb-0.5"
            >
              {info.viewMap}
            </a>
          </div>

          {/* Schedule */}
          <div className="flex flex-col items-center p-6 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow">
             <div className="w-12 h-12 flex items-center justify-center bg-rose-100 rounded-full mb-6 text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-2">{info.scheduleTitle}</h3>
            <ul className="text-stone-500 space-y-2 text-sm">
              {info.schedule.slice(0, 3).map((item, idx) => (
                <li key={idx}><span className="font-semibold text-stone-700">{item.time}</span> - {item.activity}</li>
              ))}
              <li className="italic pt-2">{info.more}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
