'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  action?: any;
}

interface AIAssistantProps {
  onActionExecute?: (action: any) => Promise<void>;
}

export function AIAssistant({ onActionExecute }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your AI Engineering guide. I can help you write code, run commands, and understand AI concepts. What should we build today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOllamaMissing, setIsOllamaMissing] = useState(false);

  useEffect(() => {
    fetch('/api/llm-status')
      .then(res => res.json())
      .then(data => setIsOllamaMissing(!data.running));
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.text,
        action: data.action
      }]);

      if (data.action && onActionExecute) {
        await onActionExecute(data.action);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting to the local LLM. Make sure Ollama is running!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full border-l border-border/40 bg-card/20">
      <div className="p-4 border-b border-border/40 bg-background/50 backdrop-blur flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Bot size={14} /> Assistant
          </h3>
          <Badge variant={isOllamaMissing ? "destructive" : "secondary"} className="text-[10px] h-5">
            {isOllamaMissing ? "Ollama Offline" : "Qwen 2.5"}
          </Badge>
        </div>
        {isOllamaMissing && (
          <p className="text-[10px] text-destructive font-medium bg-destructive/5 p-2 rounded border border-destructive/20">
            Local LLM not detected. Please start Ollama.
          </p>
        )}
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} mb-6`}>
              <div className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-primary/10 border border-primary/20 text-foreground'
                  : 'bg-muted/40 border border-border/40 text-foreground'
              }`}>
                <p className="whitespace-pre-wrap">{m.content}</p>
                {m.action && (
                  <div className="mt-3 p-2 bg-background/40 rounded-md border border-border/40 text-[10px] font-mono flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Action: {m.action.action}
                  </div>
                )}
              </div>
              <span className="text-[9px] uppercase tracking-tighter font-bold opacity-30 mt-1.5 px-1">
                {m.role}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <Loader2 size={14} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border/40 bg-background/50">
        <div className="relative flex items-center">
          <Input
            className="pr-10 bg-muted/20 border-border/40 focus:ring-1 focus:ring-primary/40 rounded-xl"
            placeholder="Type a command or ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={handleSend}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
          </Button>
        </div>
        <p className="text-[9px] text-center text-muted-foreground mt-3 uppercase tracking-widest opacity-50">
          Powered by Qwen 2.5 local LLM
        </p>
      </div>
    </div>
  );
}
