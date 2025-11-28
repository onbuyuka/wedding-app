import React, { useState } from 'react';
import { CONTENT } from '../constants';

interface PhotoUploadProps {
  content: typeof CONTENT.en;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ content }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { upload } = content;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    setIsUploading(true);
    // Simulate upload to Drive delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newFiles = Array.from(files).map(f => f.name);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setIsUploading(false);
  };

  return (
    <section id="upload" className="scroll-mt-24 py-20 bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">{upload.title}</h2>
        <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
          {upload.description}
        </p>

        <div 
          className={`relative border-2 border-dashed rounded-xl p-10 transition-colors ${
            dragActive ? "border-rose-400 bg-rose-50" : "border-stone-300 bg-white"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            multiple 
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center justify-center space-y-4">
             <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
             </div>
             <div>
               <p className="text-lg font-medium text-stone-700">
                 {isUploading ? upload.uploading : upload.dragDrop}
               </p>
               <p className="text-sm text-stone-500 mt-1">{upload.browse}</p>
             </div>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-8 text-left">
            <h4 className="font-semibold text-stone-700 mb-3">{upload.recent}:</h4>
            <ul className="space-y-2">
              {uploadedFiles.map((file, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-stone-600 bg-white p-2 rounded shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {file}
                  <span className="ml-auto text-xs text-green-600 font-medium">{upload.driveNote}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <p className="mt-6 text-xs text-stone-400 italic">
          * Note: In a production app, this would use OAuth 2.0 to authenticate securely with your specific Google Drive account via a backend.
        </p>
      </div>
    </section>
  );
};

export default PhotoUpload;
