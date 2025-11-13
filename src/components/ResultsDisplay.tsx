// src/components/ResultsDisplay.tsx
import * as React from 'react';
import DownloadIcon from '@mui/icons-material/Download';

interface ResultsDisplayProps {
  result: {
    originalSize: number;
    processedSize: number;
    fileName: string;
    processedBlob: Blob;
  };
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const { originalSize, processedSize, fileName, processedBlob } = result;
  const spaceSaved = originalSize > 0 ? ((originalSize - processedSize) / originalSize) * 100 : 0;
  const downloadUrl = URL.createObjectURL(processedBlob);

  return (
    <div className="w-full max-w-2xl mx-auto bg-dark-card p-6 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-light-text">Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-medium-text">Original Size</p>
          <p className="text-2xl font-semibold text-light-text">{formatBytes(originalSize)}</p>
        </div>
        <div>
          <p className="text-medium-text">New Size</p>
          <p className="text-2xl font-semibold text-secondary-accent">{formatBytes(processedSize)}</p>
        </div>
        <div>
          <p className="text-medium-text">Space Saved</p>
          <p className={`text-2xl font-semibold ${spaceSaved > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {spaceSaved.toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="text-center mt-8">
        <a
          href={downloadUrl}
          download={fileName}
          className="inline-flex items-center justify-center px-6 py-3 font-bold text-white bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
        >
          <DownloadIcon className="mr-2" />
          Download {fileName}
        </a>
      </div>
    </div>
  );
};

export default ResultsDisplay;