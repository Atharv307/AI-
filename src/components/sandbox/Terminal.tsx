'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

interface TerminalProps {
  onCommand?: (command: string) => void;
  output?: { text: string; id: number };
}

export function Terminal({ onCommand, output }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      theme: {
        background: '#1e1e1e',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    term.writeln('Welcome to AI Engineer Sandbox Terminal');
    term.write('$ ');

    let currentCommand = '';
    term.onData((data) => {
      const char = data;
      if (char === '\r') {
        term.writeln('');
        if (currentCommand.trim() && onCommand) {
          onCommand(currentCommand);
          // Don't write $ immediately, wait for output
        } else {
          term.write('$ ');
        }
        currentCommand = '';
      } else if (char === '\u007f') { // Backspace
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          term.write('\b \b');
        }
      } else {
        currentCommand += char;
        term.write(char);
      }
    });

    xtermRef.current = term;

    return () => {
      term.dispose();
    };
  }, [onCommand]);

  useEffect(() => {
    if (output?.text && xtermRef.current) {
      const lines = output.text.split('\n');
      lines.forEach(line => xtermRef.current?.writeln(line));
      xtermRef.current.write('$ ');
    }
  }, [output]);

  return <div ref={terminalRef} className="h-full w-full" />;
}
