'use client';

import React, { useState, useEffect } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

interface FileEntry {
  name: string;
  isDirectory: boolean;
  path: string;
}

interface FileExplorerProps {
  onFileSelect: (path: string) => void;
}

export function FileExplorer({ onFileSelect }: FileExplorerProps) {
  const [files, setFiles] = useState<FileEntry[]>([]);

  const refreshFiles = async () => {
    try {
      const res = await fetch('/api/workspace?action=list');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  return (
    <div className="p-4 bg-muted/30 h-full border-r">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Folder size={18} /> Workspace
      </h3>
      <div className="space-y-1">
        {files.map((file) => (
          <div
            key={file.path}
            className="flex items-center gap-2 p-1 hover:bg-muted cursor-pointer rounded text-sm"
            onClick={() => !file.isDirectory && onFileSelect(file.path)}
          >
            {file.isDirectory ? <ChevronRight size={14} /> : <File size={14} />}
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
