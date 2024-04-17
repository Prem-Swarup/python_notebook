// CodeEditor.tsx
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import Output from './Output';


interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  onAddCodeCell: () => void;
  onAddMarkdownCell: () => void;
  onRemove: () => void;
  onRun: () => any;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  onAddCodeCell,
  onAddMarkdownCell,
  onRemove,
  // onRun,
  onMoveUp,
  onMoveDown,
  onRun
}) => {
  const [output, setOutput] = useState<string>('');
  const [hasRan, setRan] = useState<boolean>(false);
  const [isRunning, setRunning] = useState<boolean>(false);
  const runCode = async () => {
    // Simulate running the code on the server
    // You would replace this with actual code execution logic
    // Here, we just set some sample output
    setRunning(true);
    setRan(true);
    const out = await onRun();
    setRunning(false);
    // setRan(false);
    setOutput(out);
  };

  return (
    <div className="relative w-4/5 mx-auto"> {/* Adjust width as needed */}
      <div className="bg-gray-200 rounded-lg p-4 mb-4 relative">
        <div className="flex justify-between items-center mb-4">
          <button onClick={runCode} className="px-2 py-1 text-sm bg-green-500 text-white rounded-lg">
            Run
          </button>
          <div className="flex space-x-2 absolute top-0 right-0">
            <button onClick={onMoveUp} className="px-2 py-1 text-sm bg-green-500 text-white rounded-lg">
              Up
            </button>
            <button onClick={onMoveDown} className="px-2 py-1 text-sm bg-green-500 text-white rounded-lg">
              Down
            </button>
            <button onClick={onAddCodeCell} className="px-2 py-1 text-sm bg-green-500 text-white rounded-lg">
              + Code Cell
            </button>
            <button onClick={onAddMarkdownCell} className="px-2 py-1 text-sm bg-green-500 text-white rounded-lg">
              + Text Cell
            </button>
            <button onClick={onRemove} className="px-2 py-1 text-sm bg-red-500 text-white rounded-lg">
              Remove
            </button>
          </div>
        </div>
        <AceEditor
          mode="python"
          theme="github"
          value={initialValue}
          onChange={onChange}
          width="100%"
          height="300px"
          editorProps={{ $blockScrolling: true }}
        />
        {/* <button onClick={runCode} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
          Run
        </button> */}
        {hasRan && <Output output={output} />}
      </div>
    </div>
  );
};

export default CodeEditor;
