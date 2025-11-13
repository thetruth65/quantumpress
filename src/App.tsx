// src/App.tsx (Final Single-Column Layout)

import Header from './components/Header';
import FileUploader from './components/FileUploader';
import ActionPanel from './components/ActionPanel';
import ResultsDisplay from './components/ResultsDisplay';
import ProcessingModal from './components/ProcessingModal';
import HuffmanTreeVisualizer from './components/HuffmanTreeVisualizer';
import { useHuffman } from './hooks/useHuffman';
import AlgorithmInfo from './components/AlgorithmInfo';
import OutputFileInfo from './components/OutputFileInfo';
import SerializationInfo from './components/SerializationInfo';
import DeserializationInfo from './components/DeserializationInfo';
import UserHint from './components/UserHint';

function App() {
  const {
    file,
    isProcessing,
    result,
    error,
    handleFileChange,
    compressFile,
    decompressFile,
  } = useHuffman();

  const wasCompression = result && result.tree;
  const wasDecompression = result && !result.tree;

  return (
    <div className="min-h-screen bg-dark-bg text-light-text p-4 md:p-8">
      <ProcessingModal isProcessing={isProcessing} />
      
      <div className="max-w-[88%] w-full mx-auto">
        <Header />

        {/* 
          FIX: The grid layout is replaced with a simple flex column.
          `items-center` ensures all cards are centered within the 88% width container.
        */}
        <main className="mt-8 flex flex-col items-center">

          {/* --- Section 1: Interactive Elements --- */}
          <FileUploader onFileChange={handleFileChange} file={file} />
          <ActionPanel
            onCompress={compressFile}
            onDecompress={decompressFile}
            file={file}
          />
          <UserHint />
          {error && (
            <div className="text-center text-red-500 font-bold my-4">
                {error}
            </div>
          )}
          {result && <ResultsDisplay result={result} />}
          
          {/* --- Section 2: Informational Elements --- */}
          {/* These will now appear below the interactive section, creating the desired scroll flow. */}
          <AlgorithmInfo />

          {wasCompression && <SerializationInfo />}
          {wasCompression && <OutputFileInfo />}
          {wasDecompression && <DeserializationInfo />}

          {wasCompression && <HuffmanTreeVisualizer tree={result.tree} />}
          
        </main>
      </div>
    </div>
  );
}

export default App;