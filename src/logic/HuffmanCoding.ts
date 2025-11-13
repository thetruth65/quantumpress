// src/logic/HuffmanCoding.ts (UPGRADED VERSION)

import type { HuffmanNode, FrequencyMap, CodeMap} from '../types';
import { PriorityQueue } from './PriorityQueue';

export class HuffmanCoding {

  // --- PRIVATE HELPER METHODS ---

  private static buildFrequencyMap(data: Uint8Array): FrequencyMap {
    const freqMap: FrequencyMap = new Map();
    data.forEach(byte => {
      const char = String.fromCharCode(byte);
      freqMap.set(char, (freqMap.get(char) || 0) + 1);
    });
    return freqMap;
  }

  private static buildTree(freqMap: FrequencyMap): HuffmanNode {
    const pq = new PriorityQueue();
    freqMap.forEach((frequency, char) => {
      pq.enqueue({ char, frequency, left: null, right: null });
    });

    if (pq.size() === 0) {
      return { char: null, frequency: 0, left: null, right: null };
    }
    
    // Handle case with only one character
    if (pq.size() === 1) {
        const node = pq.dequeue()!;
        const parent: HuffmanNode = {
            char: null,
            frequency: node.frequency,
            left: node,
            right: null
        };
        pq.enqueue(parent);
    }

    while (pq.size() > 1) {
      const left = pq.dequeue()!;
      const right = pq.dequeue()!;
      const parent: HuffmanNode = {
        char: null,
        frequency: left.frequency + right.frequency,
        left,
        right,
      };
      pq.enqueue(parent);
    }
    return pq.dequeue()!;
  }

  private static generateCodes(node: HuffmanNode | null, prefix = '', codeMap: CodeMap = new Map()): CodeMap {
    if (!node) return codeMap;
    if (node.char !== null) {
      codeMap.set(node.char, prefix || '0'); // Handle single-node tree
    } else {
      this.generateCodes(node.left, prefix + '0', codeMap);
      this.generateCodes(node.right, prefix + '1', codeMap);
    }
    return codeMap;
  }

  private static encodeData(data: Uint8Array, codes: CodeMap): { encodedBits: string, padding: number } {
    let encodedBits = '';
    data.forEach(byte => {
      encodedBits += codes.get(String.fromCharCode(byte));
    });

    const padding = (8 - (encodedBits.length % 8)) % 8;
    return { encodedBits: encodedBits + '0'.repeat(padding), padding };
  }

  // --- ADVANCED TREE SERIALIZATION ---

  // Converts the tree structure into a compact bit string
  private static _serializeTree(node: HuffmanNode | null, bitString: string = ''): string {
    if (node === null) return bitString;
    
    if (node.char !== null) {
      // Leaf node: '1' followed by the 8 bits of the character
      bitString += '1';
      bitString += node.char.charCodeAt(0).toString(2).padStart(8, '0');
    } else {
      // Internal node: '0', then recurse
      bitString += '0';
      bitString = this._serializeTree(node.left, bitString);
      bitString = this._serializeTree(node.right, bitString);
    }
    return bitString;
  }

  // Reconstructs the tree from the compact bit string
  private static _deserializeTree(bitStringIterator: { bits: string; index: number }): HuffmanNode | null {
      if (bitStringIterator.index >= bitStringIterator.bits.length) {
          return null;
      }

      const bit = bitStringIterator.bits[bitStringIterator.index++];
      if (bit === '1') {
          // Leaf node
          const charBits = bitStringIterator.bits.substring(bitStringIterator.index, bitStringIterator.index + 8);
          bitStringIterator.index += 8;
          const charCode = parseInt(charBits, 2);
          return { char: String.fromCharCode(charCode), frequency: 0, left: null, right: null };
      } else {
          // Internal node
          const left = this._deserializeTree(bitStringIterator);
          const right = this._deserializeTree(bitStringIterator);
          return { char: null, frequency: 0, left, right };
      }
  }


  // --- PUBLIC API ---

  public static compress(data: Uint8Array, originalFileName: string): Blob {
    if (data.length === 0) {
      // Handle empty file
      return new Blob([], { type: 'application/octet-stream' });
    }

    const freqMap = this.buildFrequencyMap(data);
    const tree = this.buildTree(freqMap);
    const codes = this.generateCodes(tree);
    const { encodedBits, padding } = this.encodeData(data, codes);
    
    // Create compact binary header
    const treeBitString = this._serializeTree(tree);
    const treeBytes = new Uint8Array(Math.ceil(treeBitString.length / 8));
    for (let i = 0; i < treeBitString.length; i += 8) {
      const byteStr = treeBitString.substr(i, 8).padEnd(8, '0');
      treeBytes[i / 8] = parseInt(byteStr, 2);
    }

    const header = {
      // We only need the length of the tree and the padding now
      treeBitLength: treeBitString.length,
      padding,
      originalFileName
    };
    const headerString = JSON.stringify(header);
    const headerBytes = new TextEncoder().encode(headerString);
    const headerLengthBytes = new Uint32Array([headerBytes.length]);
    
    // Create compressed data bytes
    const compressedBytes = new Uint8Array(encodedBits.length / 8);
    for (let i = 0; i < encodedBits.length; i += 8) {
      const byteString = encodedBits.substr(i, 8);
      compressedBytes[i / 8] = parseInt(byteString, 2);
    }

    // Combine all parts into a single Blob
    const blob = new Blob([
      headerLengthBytes,
      headerBytes,
      treeBytes,
      compressedBytes
    ], { type: 'application/octet-stream' });

    return blob;
  }

  public static async decompress(file: File): Promise<{ data: Blob, originalFileName: string }> {
    const buffer = await file.arrayBuffer();
    if (buffer.byteLength === 0) return { data: new Blob(), originalFileName: 'empty_file' };

    // Read JSON header length and header
    let offset = 0;
    const headerLength = new Uint32Array(buffer.slice(offset, 4))[0];
    offset += 4;
    const headerBytes = new Uint8Array(buffer.slice(offset, offset + headerLength));
    const headerString = new TextDecoder().decode(headerBytes);
    const header = JSON.parse(headerString);
    offset += headerLength;
    
    const { treeBitLength, padding, originalFileName } = header;

    // Read the compact tree and deserialize it
    const treeByteLength = Math.ceil(treeBitLength / 8);
    const treeBytes = new Uint8Array(buffer.slice(offset, offset + treeByteLength));
    let treeBitString = '';
    treeBytes.forEach(byte => treeBitString += byte.toString(2).padStart(8, '0'));
    treeBitString = treeBitString.substring(0, treeBitLength); // Trim to exact length

    const tree = this._deserializeTree({ bits: treeBitString, index: 0 });
    offset += treeByteLength;
    
    // Decode data
    const encodedBytes = new Uint8Array(buffer.slice(offset));
    let bitString = '';
    encodedBytes.forEach(byte => {
      bitString += byte.toString(2).padStart(8, '0');
    });
    bitString = bitString.slice(0, bitString.length - padding);

    const decodedChars: string[] = [];
    let currentNode = tree;
    for (const bit of bitString) {
        if (!currentNode) break; // Should not happen in a valid file
        
        // Handle single-node tree case
        if (!currentNode.left && !currentNode.right) {
            decodedChars.push(currentNode.char!);
            currentNode = tree;
            continue;
        }

        currentNode = bit === '0' ? currentNode.left : currentNode.right;
        if (currentNode && currentNode.char) {
            decodedChars.push(currentNode.char);
            currentNode = tree;
        }
    }
    
    const decodedBytes = new Uint8Array(decodedChars.map(char => char.charCodeAt(0)));
    
    return {
      data: new Blob([decodedBytes]),
      originalFileName
    };
  }
}