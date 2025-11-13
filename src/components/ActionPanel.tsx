// src/components/ActionPanel.tsx
import * as React from 'react';

interface ActionPanelProps {
  onCompress: () => void;
  onDecompress: () => void;
  file: File | null;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ onCompress, onDecompress, file }) => {
  const isCompressible = file !== null;
  const isDecompressible = file !== null && file.name.endsWith('.qpress');

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-8">
      <button
        onClick={onCompress}
        disabled={!isCompressible}
        className="px-8 py-3 font-bold text-white bg-gradient-to-r from-primary-accent to-secondary-accent rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        Compress
      </button>
      <button
        onClick={onDecompress}
        disabled={!isDecompressible}
        className="px-8 py-3 font-bold bg-dark-card text-light-text border-2 border-secondary-accent rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary-accent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Decompress
      </button>
    </div>
  );
};

export default ActionPanel;