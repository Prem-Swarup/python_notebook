// MarkdownText.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Remarkable } from "remarkable"

const md = Remarkable();

interface MarkdownTextProps {
  content: string;
  onChange: (value: string) => void;
  onAddCodeCell: () => void;
  onAddMarkdownCell: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const MarkdownText: React.FC<MarkdownTextProps> = ({
  content,
  onChange,
  onAddCodeCell,
  onAddMarkdownCell,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <div className="relative w-4/5 mx-auto">
      <div className="bg-gray-200 rounded-lg p-4 mb-4 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2 absolute top-0 right-0">
            <button onClick={onMoveUp} className="px-4 py-2 bg-green-500 text-white rounded-lg  text-2xl">
              Up
            </button>
            <button onClick={onMoveDown} className="px-4 py-2 bg-green-500 text-white rounded-lg  text-2xl">
              Down
            </button>
            <button onClick={onAddCodeCell} className="px-4 py-2 bg-green-500 text-white rounded-lg  text-2xl">
              + Code Cell
            </button>
            <button onClick={onAddMarkdownCell} className="px-4 py-2 bg-green-500 text-white rounded-lg  text-2xl">
              + Text Cell
            </button>
            <button onClick={onRemove} className="px-4 py-2 bg-red-500 text-white rounded-lg  text-2xl">
              Remove
            </button>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-48 border border-gray-300 rounded-lg p-2 resize-none  text-2xl"
        ></textarea>
        <ReactMarkdown
          children={content}
          className="w-full h-48 border border-gray-300 rounded-lg p-2 resize-none  text-2xl"
        />
      </div>
    </div>
  );
};

export default MarkdownText;
