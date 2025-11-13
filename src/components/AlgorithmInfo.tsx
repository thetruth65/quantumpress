// src/components/AlgorithmInfo.tsx (Updated)
// ... (imports remain the same)

const AlgorithmInfo: React.FunctionComponent = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-dark-card p-6 rounded-lg shadow-lg my-8">
      {/* ... (h2 and p tags remain the same) */}
      <div className="text-medium-text space-y-4">
        <p>
          QuantumPress uses Huffman Coding, a classic lossless compression algorithm. It works by analyzing the frequency of characters in your file and creating optimal, variable-length codes for them.
        </p>
        {/* UPDATED: Uses our new dark-code-bg color */}
        <div className="bg-dark-code-bg p-4 rounded-lg font-mono text-sm text-gray-300">
          {/* ... (rest of the component remains the same) */}
          <p className="font-bold mb-2">// Pseudo-code:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Count the frequency of each character in the file.</li>
            <li>Create a leaf node for each unique character and its frequency.</li>
            <li>Add all leaf nodes to a priority queue (min-heap).</li>
            <li>While the queue has more than one node:</li>
            <li className="pl-4">a. Extract the two nodes with the lowest frequency.</li>
            <li className="pl-4">b. Create a new internal node with these two as children.</li>
            <li className="pl-4">c. The new node's frequency is the sum of its children's frequencies.</li>
            <li className="pl-4">d. Add the new internal node back to the queue.</li>
            <li>The last remaining node is the root of the Huffman Tree.</li>
            <li>Traverse the tree to generate binary codes (e.g., left=0, right=1).</li>
            <li>Replace each character in the file with its new binary code.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;