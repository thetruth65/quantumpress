// src/components/SerializationInfo.tsx (New File)

import * as React from 'react';
import MemoryIcon from '@mui/icons-material/Memory';

const SerializationInfo: React.FunctionComponent = () => {
  return (
    <div className="w-full bg-dark-card p-6 rounded-lg shadow-lg my-8">
      <h2 className="text-xl font-bold text-center mb-4 text-light-text flex items-center justify-center">
        <MemoryIcon className="mr-3 text-primary-accent" />
        How the Tree becomes a File
      </h2>
      <div className="text-medium-text space-y-3 text-sm">
        <p>
          A Huffman Tree exists only in memory. To save it, we convert it into a compact binary format through a process called **serialization**.
        </p>
        <ol className="list-decimal list-inside space-y-2 bg-gray-900 p-3 rounded-md">
          <li>
            <strong>Tree Traversal:</strong> We traverse the tree. For an internal node, we write a `0` bit. For a leaf node, we write a `1` bit followed by the 8 bits of the character it holds.
          </li>
          <li>
            <strong>Header Creation:</strong> A small JSON header is created containing the original filename and the exact length of the tree's binary data from Step 1.
          </li>
          <li>
            <strong>Data Encoding:</strong> The original file's content is converted into a long string of bits using the Huffman codes from the tree.
          </li>
          <li>
            <strong>Final Assembly:</strong> The Header, the binary tree data, and the encoded file data are combined into a single binary file: the `.qpress` file.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SerializationInfo;