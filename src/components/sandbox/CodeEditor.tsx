'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  content: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
}

export function CodeEditor({ content, language = 'python', onChange }: CodeEditorProps) {
  return (
    <div className="h-full border rounded-md overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={content}
        value={content}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
