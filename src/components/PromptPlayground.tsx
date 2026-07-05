'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Settings, MessageSquare } from 'lucide-react';
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
    <div className="flex flex-col h-full gap-4 p-4">
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        <Card className="col-span-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prompt</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setPrompt('')}>
              <RotateCcw size={14} />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <textarea
              className="w-full h-full p-4 bg-transparent resize-none focus:outline-none text-sm"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </CardContent>
          <div className="p-4 border-t flex justify-end">
            <Button onClick={handleRun} disabled={isLoading}>
              {isLoading ? 'Running...' : <><Play size={16} className="mr-2" /> Run Prompt</>}
            </Button>
          </div>
        </Card>

        <div className="space-y-4 flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Settings size={14} /> Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Temperature</span>
                  <span>{temperature[0]}</span>
                </div>
                <Slider
                  value={temperature}
                  onValueChange={(val) => setTemperature(val as number[])}
                  max={1}
                  step={0.1}
                />
                <p className="text-[10px] text-muted-foreground italic">
                  Higher = more creative, Lower = more deterministic
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare size={14} /> Response
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-4">
                <p className="text-sm whitespace-pre-wrap">{response || 'Response will appear here...'}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
