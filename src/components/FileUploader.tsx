// src/components/FileUploader.tsx (Corrected & Final)

import * as React from 'react';
// FIX: The missing import for the icon is now added.
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
}

const FileUploader: React.FunctionComponent<FileUploaderProps> = ({ onFileChange, file }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  const clearFile = () => {
    onFileChange(null);
  }

  return (
    <div
      className={`
        w-full max-w-2xl mx-auto border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
        ${isDragging ? 'border-primary-accent bg-dark-card scale-105' : 'border-medium-text bg-dark-bg'}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} />
      {file ? (
        <div className="flex flex-col items-center">
            <p className="text-light-text text-lg mb-4">File Ready: <span className="font-bold">{file.name}</span></p>
            <button
                onClick={clearFile}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
                Choose a different file
            </button>
        </div>
      ) : (
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <UploadFileIcon className="text-primary-accent" style={{ fontSize: 60 }} />
          <p className="mt-4 text-lg text-light-text">
            <span className="font-bold text-secondary-accent">Click to upload</span> or drag and drop
          </p>
          <p className="text-medium-text">Any file type works!</p>
        </label>
      )}
    </div>
  );
};

export default FileUploader;