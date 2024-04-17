import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import MarkdownText from './MarkdownText';

interface Block {
  id: number;
  type: string;
  content: string;
}

const Notebook: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Add a default code block when component mounts
    addCodeBlock(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addCodeBlock = (index: number) => {
    const newBlock: Block = { id: nextId, type: 'code', content: '' };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks.map((block, idx) => ({ ...block, id: idx })));
    setNextId(nextId + 1);
  };

  const addMarkdownBlock = (index: number) => {
    const newBlock: Block = { id: nextId, type: 'markdown', content: '' };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    setBlocks(newBlocks.map((block, idx) => ({ ...block, id: idx })));
    setNextId(nextId + 1);
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter(block => block.id !== id));
    setNextId(nextId - 1);
  };

  const updateContent = (id: number, content: string) => {
    setBlocks(blocks.map(block => (block.id === id ? { ...block, content } : block)));
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      const newBlocks = [...blocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index - 1];
      newBlocks[index - 1] = temp;
      setBlocks(newBlocks);
    }
  };

  const moveDown = (index: number) => {
    if (index < blocks.length - 1) {
      const newBlocks = [...blocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + 1];
      newBlocks[index + 1] = temp;
      setBlocks(newBlocks);
    }
  };

  // const Run = (index: number) => {
  //   // logic to run a single block
  //   return blocks[index].content+'\nSample output after running the code block';
  // }
  const Run = async (index: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/run-python`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: blocks[index].content }),
      });
  
      if (!response.ok) {
        console.error('Failed to run Python code:', response.statusText);
        return 'Error 1 running Python code';
      }
  
      const data = await response.json();
      return data.output;
    } catch (error) {
      console.error('Error 3 running Python code:', error);
      return 'Error 2 running Python code';
    }
  };
  
  const runAllBlocks = () => {
    // Logic to run all code blocks
  };

  const connect = () => {
    // Logic to connect to a server or API
  };

  const submit = () => {
    // Logic to submit the code
  };

  return (
    <div className="p-8">
      <nav className="flex items-center justify-between mb-4">
        <div>
          <button onClick={() => addCodeBlock(blocks.length - 1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">
            + Code Cell
          </button>
          <button onClick={() => addMarkdownBlock(blocks.length - 1)} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            + Text Cell
          </button>
        </div>
        <div>
          <button onClick={runAllBlocks} className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-4">
            Run All
          </button>
          <button onClick={connect} className="bg-indigo-500 text-white px-4 py-2 rounded-lg mr-4">
            Connect
          </button>
          <button onClick={submit} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Submit
          </button>
        </div>
      </nav>
      {blocks.map((block, index) => (
        <div key={block.id} className="mb-8">
          {block.type === 'code' ? (
            <CodeEditor
              initialValue={block.content}
              onChange={(value) => updateContent(block.id, value)}
              onAddCodeCell={() => addCodeBlock(index)}
              onAddMarkdownCell={() => addMarkdownBlock(index)}
              onRemove={() => removeBlock(block.id)}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
              onRun={()=>Run(index)}
            />
          ) : (
            <MarkdownText
              content={block.content}
              onChange={(value) => updateContent(block.id, value)}
              onAddCodeCell={() => addCodeBlock(index)}
              onAddMarkdownCell={() => addMarkdownBlock(index)}
              onRemove={() => removeBlock(block.id)}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Notebook;
