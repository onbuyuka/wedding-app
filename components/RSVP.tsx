import React from 'react';
import { CONTENT } from '../constants';

interface RSVPProps {
  content: typeof CONTENT.en;
}

const RSVP: React.FC<RSVPProps> = ({ content }) => {
  const { rsvp } = content;

  return (
    <section id="rsvp" className="scroll-mt-24 py-20 bg-rose-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-serif text-4xl text-stone-800 mb-4">{rsvp.closed.title}</h2>
          <p className="text-stone-600 text-lg leading-relaxed">{rsvp.closed.message}</p>
          <p className="text-stone-400 text-sm mt-6">{rsvp.deadline}</p>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
