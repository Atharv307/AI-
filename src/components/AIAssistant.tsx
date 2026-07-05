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
    <div className="flex flex-col h-full border-l">
      <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Bot size={18} /> AI Assistant
        </h3>
        <Badge variant="outline" className="text-xs">Qwen 2.5</Badge>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 ${
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  <span className="text-[10px] uppercase font-bold opacity-70">
                    {m.role}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                {m.action && (
                  <div className="mt-2 p-2 bg-background/50 rounded border border-dashed text-[10px] font-mono">
                    Action: {m.action.action}
                  </div>
                )}
              </div>
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

      <div className="p-4 border-t flex gap-2">
        <Input
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button size="icon" onClick={handleSend} disabled={isLoading}>
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
