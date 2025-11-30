import React from 'react';
import { CONTENT } from '../constants';

interface PhotoUploadProps {
  content: typeof CONTENT.en;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ content }) => {
  const { upload } = content;

  return (
    <section id="upload" className="scroll-mt-24 py-20 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">{upload.title}</h2>
        <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
          {upload.description}
        </p>

        <a
          href={upload.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-stone-800 text-white font-semibold py-4 px-8 rounded-lg hover:bg-stone-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {upload.button}
        </a>
      </div>
    </section>
  );
};

export default PhotoUpload;
