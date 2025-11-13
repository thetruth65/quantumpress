// src/components/ProcessingModal.tsx
import * as React from 'react';
import { CircularProgress } from '@mui/material';

interface ProcessingModalProps {
  isProcessing: boolean;
}

const ProcessingModal: React.FC<ProcessingModalProps> = ({ isProcessing }) => {
  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
      <CircularProgress size={60} />
      <p className="text-light-text text-xl mt-4">Processing...</p>
    </div>
  );
};

export default ProcessingModal;