"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const markdownToHtml = (text: string): string => {
  const lines = text.split('\n');
  const htmlLines: string[] = [];
  let inList = false;

  for (const line of lines) {
    let trimmed = line.trim();
    if (trimmed === '') {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push('<br>');
      continue;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      const content = trimmed.slice(4);
      htmlLines.push(`<h3 style="font-size: 1.25rem; font-weight: 700; margin: 1rem 0 0.5rem 0; color: #1f2937;">${escapeHtml(content)}</h3>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      const content = trimmed.slice(3);
      htmlLines.push(`<h2 style="font-size: 1.5rem; font-weight: 700; margin: 1rem 0 0.5rem 0; color: #1f2937;">${escapeHtml(content)}</h2>`);
      continue;
    }
    if (trimmed.startsWith('# ')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      const content = trimmed.slice(2);
      htmlLines.push(`<h1 style="font-size: 2rem; font-weight: 700; margin: 1rem 0 0.5rem 0; color: #1f2937;">${escapeHtml(content)}</h1>`);
      continue;
    }

    // Lists
    if (trimmed.startsWith('- ')) {
      let listItem = trimmed.slice(2);
      listItem = processInline(listItem);
      if (!inList) {
        htmlLines.push('<ul style="margin: 0.5rem 0 0.5rem 1.5rem; padding-left: 1rem; list-style-type: disc;">');
        inList = true;
      }
      htmlLines.push(`<li style="margin-bottom: 0.25rem;">${listItem}</li>`);
      continue;
    }

    // Paragraph
    if (inList) {
      htmlLines.push('</ul>');
      inList = false;
    }
    let para = processInline(line);
    if (para.trim()) {
      htmlLines.push(para);
    }
  }

  if (inList) {
    htmlLines.push('</ul>');
  }

  return htmlLines.join('');
};

const escapeHtml = (text: string): string => {
  const map: {[key: string]: string} = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

const processInline = (text: string): string => {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700;">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background-color: #f3f4f6; padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.75rem; color: #1f2937;">$1</code>')
    .replace(/\[(.*?)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">$1</a>');
};

const ChatWidget: React.FC = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatKey = 'ajpacific-chat-history';

  // Hide site assistant on the guided explore flow (separate product UX)
  const hideOnExplore = pathname === '/explore';

  useEffect(() => {
    setIsMounted(true);
    // Load from localStorage
    const saved = localStorage.getItem(chatKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsExpanded(!isExpanded);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
      signal: controller.signal,
    });

    if (!response.ok) {
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMessage: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMessage]);

    // Buffer incomplete SSE lines across network chunks (prevents cut-off replies)
    let lineBuffer = '';

    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          lineBuffer += decoder.decode(value, { stream: true });
          const lines = lineBuffer.split(/\r?\n/);
          lineBuffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;

            const data = trimmed.slice(5).trimStart();
            if (data === '[DONE]') {
              lineBuffer = '';
              break;
            }
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.content;
              if (delta) {
                assistantMessage.content += delta;
                const snapshot = assistantMessage.content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: snapshot,
                  };
                  return newMessages;
                });
              }
            } catch {
              // skip incomplete JSON
            }
          }
        }

        // Flush trailing buffer if the connection closed without a final newline
        if (lineBuffer.trim().startsWith('data:')) {
          const data = lineBuffer.trim().slice(5).trimStart();
          if (data !== '[DONE]') {
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantMessage.content += parsed.content;
                const snapshot = assistantMessage.content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: snapshot,
                  };
                  return newMessages;
                });
              }
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Stream error:', err);
        }
      }
    }

    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(chatKey);
  };

  if (!isMounted || hideOnExplore) return null;

  const hasMessages = messages.length > 0;

  return (
    <>
      {!isExpanded && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          style={{ backgroundColor: '#007E3A' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005C2A')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007E3A')}
          aria-label="Open AI Assistant"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </button>
      )}

      {isExpanded && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={toggleChat}
            style={{ animation: 'fadeIn 0.2s ease-out' }}
          />
          <div
            className="fixed z-40 bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto md:w-[350px] h-[90vh] md:h-[600px] max-h-[90vh] md:max-h-[600px] glass overflow-hidden flex flex-col animate-slide-up bg-white"
            style={{ animation: 'slideUp 0.2s ease-out' }}
          >
            <div className="p-4 text-white font-bold flex justify-between items-center" style={{ backgroundColor: '#007E3A' }}>
              <div className="flex items-center gap-2">
                <span>AI Assistant</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                {hasMessages && (
                  <button onClick={clearChat} className="text-sm hover:bg-white/20 px-2 py-1 rounded text-white/90" title="Clear Chat">
                    Clear
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="rounded-full p-1 transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005C2A')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-grow p-4 md:p-6 overflow-y-auto bg-slate-50">
              {!hasMessages ? (
                <div className="flex flex-col justify-center items-center text-center h-full">
                  <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#007E3A' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-slate-600 text-sm md:text-base mb-2 font-medium">AI Assistant Ready</p>
                  <p className="text-slate-400 italic text-xs md:text-sm mb-6">Ask about our services, finance consulting, AI transformation, or anything else!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-4">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.role === 'user'
                              ? 'bg-brand text-white'
                              : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                          }`}
                        >
                          {msg.role === 'user' ? (
                            <p className="text-sm whitespace-pre-wrap text-white">{msg.content}</p>
                          ) : (
                            <div
                              className="text-sm leading-relaxed max-w-none"
                              style={{ color: '#1f2937' }}
                              dangerouslySetInnerHTML={{__html: markdownToHtml(msg.content)}}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 shadow-sm p-3 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder={isLoading ? '...' : 'Type your message...'}
                  className="flex-grow px-4 py-3 rounded-lg border border-slate-200 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#ffffff', color: '#1f2937' }}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-brand hover:bg-brand-dark disabled:bg-slate-300 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        .animate-slide-up { animation: slideUp 0.2s ease-out; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce { animation: bounce 1.4s infinite; }
      `}</style>
    </>
  );
};

export default ChatWidget;
