// src/hooks/useHuffman.ts
import { useState, useCallback } from 'react';
import { HuffmanCoding } from '../logic/HuffmanCoding';
import type { HuffmanNode } from '../types';

// Defines the shape of the compression/decompression results
interface ProcessResult {
  originalSize: number;
  processedSize: number;
  fileName: string;
  processedBlob: Blob;
  tree: HuffmanNode | null;
}

export const useHuffman = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((newFile: File | null) => {
    setFile(newFile);
    setResult(null); // Reset results when a new file is uploaded
    setError(null);
  }, []);

  const compressFile = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      
      // We pass a 'dummy' tree for now, as the actual tree is generated inside
      const processedBlob = HuffmanCoding.compress(data, file.name);
      
      // To get the tree for visualization, we need to rebuild it
      const freqMap = (HuffmanCoding as any).buildFrequencyMap(data);
      const tree = (HuffmanCoding as any).buildTree(freqMap);


      setResult({
        originalSize: file.size,
        processedSize: processedBlob.size,
        fileName: `${file.name.split('.')[0]}.qpress`,
        processedBlob,
        tree: tree,
      });

    } catch (e) {
      setError('Compression failed. The file might be corrupted or in an unsupported format.');
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  const decompressFile = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const { data, originalFileName } = await HuffmanCoding.decompress(file);
      
      setResult({
        originalSize: file.size,
        processedSize: data.size,
        fileName: originalFileName,
        processedBlob: data,
        tree: null, // No tree to show on decompression
      });

    } catch (e) {
      setError('Decompression failed. The file may not be a valid .qpress file or is corrupted.');
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  return {
    file,
    isProcessing,
    result,
    error,
    handleFileChange,
    compressFile,
    decompressFile,
  };
};