'use client';

import React, { useState, useEffect } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileEntry {
  name: string;
  isDirectory: boolean;
  path: string;
}

interface FileExplorerProps {
  onFileSelect: (path: string) => void;
  refreshKey?: number;
}

export function FileExplorer({ onFileSelect, refreshKey }: FileExplorerProps) {
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
  }, [refreshKey]);

  const handleNewFile = async () => {
    const name = prompt('Enter filename:');
    if (!name) return;
    try {
      await fetch('/api/workspace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'write', path: name, content: '' })
      });
      refreshFiles();
    } catch (error) {
      console.error('Failed to create file:', error);
    }
  };

  return (
    <div className="p-4 bg-muted/30 h-full border-r border-border/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Folder size={14} /> Workspace
        </h3>
        <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-primary/10" onClick={handleNewFile}>
          <Plus size={14} />
        </Button>
      </div>
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
