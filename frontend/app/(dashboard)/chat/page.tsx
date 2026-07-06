'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Message } from '../../../features/chat/types';
import PopButton from '../../../components/ui/pop-button';
import { useRouter } from 'next/navigation';

const MONO = '"JetBrains Mono", "Fira Code", monospace';

export default function ChatPage() {
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load history on mount
    const fetchHistory = async () => {
      const storedId = localStorage.getItem('workspaceId');
      if (!storedId) {
        router.push('/');
        return;
      }
      setWorkspaceId(storedId);

      try {
        setIsLoadingHistory(true);
        const res = await fetch(`http://127.0.0.1:8000/api/chat/history/${storedId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          } else {
            setMessages([
              { role: 'assistant', content: "Hello, Creator. I'm Echo. I've loaded your workspace and memory. How can I assist you today?" }
            ]);
          }
        }
      } catch (err) {
        console.error('Failed to load history:', err);
        setMessages([
          { role: 'assistant', content: "Hello, Creator. I'm Echo. I've loaded your workspace and memory. How can I assist you today?" }
        ]);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    
    fetchHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || !workspaceId) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const requestBody = {
      workspace_id: workspaceId,
      messages: [...messages, { role: 'user', content: userMsg }]
    };

    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          throw new Error('Unable to reach the AI backend.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) throw new Error('No response body');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: newMessages[lastIndex].content + chunk
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error communicating with local AI.';
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          content: errorMessage.includes('Unable to reach') ? errorMessage : 'Error communicating with local AI.'
        };
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'flex', 
              gap: 'var(--space-4)',
              alignItems: 'flex-start',
              maxWidth: '800px',
              margin: msg.role === 'user' ? '0 0 0 auto' : '0 auto 0 0',
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={18} color="#F5F5F5" />
              </div>
            )}
            
            <div style={{ 
              backgroundColor: msg.role === 'user' ? '#F5F5F5' : 'transparent',
              color: msg.role === 'user' ? '#050505' : '#E0E0E0',
              padding: msg.role === 'user' ? '12px 16px' : '6px 0',
              borderRadius: '12px',
              fontSize: '15px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={18} color="#F5F5F5" />
              </div>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
             <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Loader2 className="animate-spin" size={16} color="#A8A8A8" />
             </div>
             <span style={{ fontFamily: MONO, fontSize: '12px', color: '#6E6E6E' }}>Synthesizing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: 'var(--space-4) var(--space-6)', backgroundColor: 'transparent' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Talk to EchoOS..."
            disabled={isTyping}
            style={{
              width: '100%',
              padding: '16px 56px 16px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              color: '#F5F5F5',
              fontSize: '15px',
              outline: 'none',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
            }}
          />
          <PopButton
            type="submit"
            disabled={!input.trim() || isTyping}
            style={{
              position: 'absolute',
              right: '8px',
              top: '8px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: input.trim() && !isTyping ? '#F5F5F5' : 'rgba(255,255,255,0.1)',
              color: input.trim() && !isTyping ? '#050505' : 'rgba(255,255,255,0.3)',
              padding: 0,
            }}
          >
            <Send size={18} />
          </PopButton>
        </form>
        <p style={{ textAlign: 'center', color: '#6E6E6E', fontSize: '12px', marginTop: '12px', fontFamily: MONO }}>
          Everything is processed locally.
        </p>
      </div>
    </div>
  );
}
