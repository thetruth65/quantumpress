// src/components/HuffmanTreeVisualizer.tsx (The Definitive, Final Fix) 
 
import * as React from 'react'; 
import Tree from 'react-d3-tree'; 
import type { RawNodeDatum, CustomNodeElementProps } from 'react-d3-tree'; 
import type { HuffmanNode } from '../types'; 
import html2canvas from 'html2canvas'; 
import DownloadIcon from '@mui/icons-material/Download'; 
 
const DynamicTree = (props: any) => { 
    const TreeComponent = Tree as any; 
    return <TreeComponent {...props} />; 
}; 
 
interface HuffmanTreeVisualizerProps { 
  tree: HuffmanNode | null; 
} 
 
const transformData = (node: HuffmanNode | null): RawNodeDatum | undefined => { 
  if (!node) return undefined; 
 
  const name = node.char 
    ? `'${node.char === ' ' ? 'space' : node.char}' : ${node.frequency}` 
    : `(sum): ${node.frequency}`; 
 
  const children: RawNodeDatum[] = []; 
  if (node.left) { 
    const leftChild = transformData(node.left); 
    if (leftChild) children.push(leftChild); 
  } 
  if (node.right) { 
    const rightChild = transformData(node.right); 
    if (rightChild) children.push(rightChild); 
  } 
 
  return { name, children }; 
}; 
 
const renderRectSvgNode = ({ nodeDatum, toggleNode }: CustomNodeElementProps) => ( 
    <g> 
      <circle r={15} fill={nodeDatum.children && nodeDatum.children.length > 0 ? '#6A11CB' : '#2575FC'} onClick={toggleNode} /> 
      <text fill="white" stroke="white" strokeWidth={0.3} x="20" y={5} className="text-sm"> 
        {nodeDatum.name} 
      </text> 
    </g> 
  ); 
 
const HuffmanTreeVisualizer: React.FunctionComponent<HuffmanTreeVisualizerProps> = ({ tree }) => { 
  const treeData = transformData(tree); 
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });

  // Center the tree when component mounts or container size changes
  React.useEffect(() => {
    if (containerRef.current) {
      const dimensions = containerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 50
      });
    }
  }, []);
 
  const handleExport = () => { 
    if (containerRef.current) { 
      html2canvas(containerRef.current, { 
        backgroundColor: '#1E1E1E', 
        scale: 4, 
        useCORS: true, 
      }).then((canvas) => { 
        const link = document.createElement('a'); 
        link.download = 'huffman-tree.png'; 
        link.href = canvas.toDataURL('image/png'); 
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 
      }); 
    } 
  }; 
 
  if (!treeData) return null; 
 
  return ( 
    <div className="w-full max-w-5xl mx-auto bg-dark-card rounded-lg my-8 p-4"> 
      <div className="flex justify-center items-center mb-2"> 
        <h2 className="text-xl font-bold text-center text-light-text flex-grow">Huffman Tree Visualization</h2> 
        <button 
          onClick={handleExport} 
          className="ml-4 px-3 py-2 text-sm font-bold text-white bg-secondary-accent rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105" 
        > 
          <DownloadIcon fontSize="small" className="mr-2" /> 
          Export PNG 
        </button> 
      </div> 
 
      <p className="text-center text-medium-text text-sm mt-1 mb-4"> 
        Each leaf shows the character and its frequency. Each branch shows the combined frequency of the nodes below it. 
      </p> 
 
      <div ref={containerRef} className="w-full h-[500px]"> 
        <DynamicTree 
          data={treeData} 
          orientation="vertical" 
          pathFunc="diagonal" 
          translate={translate} 
          separation={{ siblings: 1, nonSiblings: 2 }} 
          renderCustomNodeElement={renderRectSvgNode} 
          pathClassFunc={() => 'tree-link'} 
          collapsible={false} 
          transitionDuration={500} 
          zoomable={true} 
        /> 
      </div> 
    </div> 
  ); 
}; 
 
export default HuffmanTreeVisualizer;