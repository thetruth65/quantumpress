// src/components/DeserializationInfo.tsx (New File)

import * as React from 'react';
import HubIcon from '@mui/icons-material/Hub';

const DeserializationInfo: React.FunctionComponent = () => {
  return (
    <div className="w-full bg-dark-card p-6 rounded-lg shadow-lg my-8">
      <h2 className="text-xl font-bold text-center mb-4 text-light-text flex items-center justify-center">
        <HubIcon className="mr-3 text-secondary-accent" />
        How Decompression Works
      </h2>
      <div className="text-medium-text space-y-3 text-sm">
        <p>
          Decompression is the reverse process, called **deserialization**, where we read the `.qpress` file to reconstruct the original data.
        </p>
        <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-3 rounded-md">
          <li>
            <strong>Read Header:</strong> We first read the JSON header to get the original filename and the size of the stored Huffman Tree.
          </li>
          <li>
            <strong>Rebuild Tree:</strong> We read the tree's binary data bit-by-bit. A `0` means "create an internal node and recurse," while a `1` means "create a leaf node with the next 8 bits as its character." This perfectly reconstructs the original tree.
          </li>
          <li>
            <strong>Decode Data:</strong> We read the rest of the file's encoded bits. We traverse the rebuilt tree (0=left, 1=right) until we hit a leaf node, write that character to the output, and return to the root.
          </li>
          <li>
            <strong>Final File:</strong> Once all bits are decoded, the sequence of characters is assembled into the original file.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DeserializationInfo;