import React, { useState } from 'react';
import { CONTENT } from '../constants';

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: {
          cloudName: string;
          uploadPreset: string;
          sources: string[];
          multiple: boolean;
          maxFiles: number;
          folder: string;
          resourceType: string;
          clientAllowedFormats: string[];
          maxFileSize: number;
          styles: {
            palette: Record<string, string>;
            fonts: Record<string, unknown>;
          };
        },
        callback: (error: Error | null, result: { event: string; info?: { files?: unknown[] } }) => void
      ) => { open: () => void };
    };
  }
}

interface PhotoUploadProps {
  content: typeof CONTENT.en;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ content }) => {
  const { upload } = content;
  const [uploadCount, setUploadCount] = useState(0);

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'ddrjvqexz',
        uploadPreset: 'wedding_uploads',
        sources: ['local', 'camera'],
        multiple: true,
        maxFiles: 20,
        folder: 'wedding',
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'heic', 'heif', 'webp'],
        maxFileSize: 20000000, // 20MB
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#d6d3d1',
            tabIcon: '#292524',
            menuIcons: '#292524',
            textDark: '#292524',
            textLight: '#78716c',
            link: '#292524',
            action: '#292524',
            inactiveTabIcon: '#a8a29e',
            error: '#dc2626',
            inProgress: '#292524',
            complete: '#16a34a',
            sourceBg: '#f5f5f4',
          },
          fonts: {
            default: null,
            "'Lato', sans-serif": {
              url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
              active: true,
            },
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setUploadCount((prev) => prev + 1);
        }
        if (!error && result && result.event === 'queues-end' && result.info?.files) {
          const count = result.info.files.length;
          if (count > 0) {
            setUploadCount(count);
          }
        }
      }
    );
    widget.open();
  };

  return (
    <section id="upload" className="scroll-mt-24 py-20 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">{upload.title}</h2>
        <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
          {upload.description}
        </p>

        <button
          onClick={openWidget}
          className="inline-flex items-center gap-3 bg-stone-800 text-white font-semibold py-4 px-8 rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {upload.button}
        </button>

        {uploadCount > 0 && (
          <p className="mt-4 text-green-600 font-medium">
            {upload.success.replace('{count}', uploadCount.toString())}
          </p>
        )}
      </div>
    </section>
  );
};

export default PhotoUpload;
