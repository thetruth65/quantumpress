// src/components/OutputFileInfo.tsx (New File)

import * as React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const OutputFileInfo: React.FunctionComponent = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-dark-card p-6 rounded-lg shadow-lg my-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-light-text flex items-center justify-center">
        <HelpOutlineIcon className="mr-3 text-secondary-accent" />
        What is a `.qpress` file?
      </h2>
      <div className="text-medium-text space-y-4">
        <p>
          The `.qpress` file is your compressed data, packaged in a custom format. It's a binary file containing everything needed to decompress it back to the original.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-900 p-3 rounded">
            <p className="font-bold text-primary-accent">Part 1</p>
            <p className="text-sm">A small header with the original filename & metadata.</p>
          </div>
          <div className="bg-gray-900 p-3 rounded">
            <p className="font-bold text-primary-accent">Part 2</p>
            <p className="text-sm">A compact, binary version of the Huffman Tree.</p>
          </div>
          <div className="bg-gray-900 p-3 rounded">
            <p className="font-bold text-primary-accent">Part 3</p>
            <p className="text-sm">The actual file data, encoded with Huffman codes.</p>
          </div>
        </div>
        <p className="text-center text-sm pt-2">
          You can decompress any `.qpress` file using the "Decompress" button on this site.
        </p>
      </div>
    </div>
  );
};

export default OutputFileInfo;