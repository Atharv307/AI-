'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Settings, MessageSquare, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';

export function PromptPlayground() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);

  const handleRun = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, temperature: temperature[0] })
      });

      const data = await res.json();
      setResponse(data.content);
    } catch (error) {
      setResponse("Error: Could not connect to local LLM.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 p-8 bg-background/50">
      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="col-span-2 flex flex-col bg-card/30 border border-border/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border/40 flex items-center justify-between bg-muted/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MessageSquare size={14} /> Prompt
            </h3>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-primary/10" onClick={() => setPrompt('')}>
              <RotateCcw size={14} />
            </Button>
          </div>
          <div className="flex-1 relative">
            <textarea
              className="w-full h-full p-6 bg-transparent resize-none focus:outline-none text-sm leading-relaxed placeholder:text-muted-foreground/50"
              placeholder="Start experimenting with your local LLM..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="p-4 border-t border-border/40 flex justify-end bg-background/50 backdrop-blur">
            <Button variant="primary" onClick={handleRun} disabled={isLoading} className="h-9 px-6 rounded-xl font-medium">
              {isLoading ? <Loader2 className="animate-spin mr-2" size={14} /> : <Play size={14} className="mr-2 fill-current" />}
              {isLoading ? 'Thinking...' : 'Run Inference'}
            </Button>
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div className="bg-card/30 border border-border/40 rounded-2xl overflow-hidden p-6 space-y-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Settings size={14} /> Configuration
            </h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium">Temperature</span>
                  <span className="font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">{temperature[0]}</span>
                </div>
                <Slider
                  value={temperature}
                  onValueChange={(val) => setTemperature(val as number[])}
                  max={1}
                  step={0.1}
                />
                <p className="text-[10px] text-muted-foreground leading-relaxed italic opacity-70">
                  Higher values lead to more creative outputs, while lower values are more stable and predictable.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-card/30 border border-border/40 rounded-2xl overflow-hidden shadow-sm min-h-0">
            <div className="p-4 border-b border-border/40 bg-muted/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Bot size={14} /> Result
              </h3>
            </div>
            <div className="flex-1 overflow-hidden p-0 relative bg-background/20">
              <ScrollArea className="h-full">
                <div className="p-6">
                  {response ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">{response}</p>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-12">
                      <Bot size={32} className="mb-4" />
                      <p className="text-xs font-medium uppercase tracking-widest">Awaiting Input</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
