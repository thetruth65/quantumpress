// src/types/index.ts

// Represents a node in the Huffman Tree
export interface HuffmanNode {
  char: string | null;
  frequency: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

// Type for the frequency map of characters/bytes
export type FrequencyMap = Map<string, number>;

// Type for the Huffman codes map
export type CodeMap = Map<string, string>;

// Represents the structure of the file header for decompression
export interface CompressedFileHeader {
  treeStructure: HuffmanNode;
  padding: number;
}