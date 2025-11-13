// src/components/Header.tsx
import * as React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-accent to-secondary-accent">
        QuantumPress
      </h1>
      <p className="text-medium-text mt-2">
        Compress and Decompress files with the power of Huffman Coding.
      </p>
    </header>
  );
};

export default Header;
