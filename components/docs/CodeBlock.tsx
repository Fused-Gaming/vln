'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlight?: number[];
}

export function CodeBlock({
  code,
  language = 'bash',
  filename,
  highlight = []
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="code-block my-6">
      {/* Header */}
      <div className="code-block-header">
        <span className="text-sm font-medium text-gray-400">
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          className={`copy-button ${copied ? 'copied' : ''}`}
          title="Copy code"
        >
          {copied ? (
            <div className="flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Copied!</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </div>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="code-block-content">
        <pre>
          <code className={`language-${language}`}>
            {lines.map((line, index) => (
              <div
                key={index}
                className={`code-line ${
                  highlight.includes(index + 1)
                    ? 'bg-yellow-500/20 border-l-2 border-yellow-500 pl-2'
                    : ''
                }`}
              >
                <span className="code-line-number">{index + 1}</span>
                <span>{line || '\n'}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
