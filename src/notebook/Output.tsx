// Output.tsx
import React from 'react';

interface OutputProps {
  output: string;
}

const Output: React.FC<OutputProps> = ({ output }) => {
  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Output</h3>
      <pre style={{textAlign: 'left'}}>{output}</pre>
    </div>
  );
};

export default Output;
