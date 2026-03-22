'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ToggleCritical } from '@/components/ToggleCritical';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { Flame, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isCriticalMode, setIsCriticalMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localInput, setLocalInput] = useState('');
  
  // Use useMemo for transport to avoid re-creating it on every render
  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/chat',
    body: { isCriticalMode },
  }), [isCriticalMode]);

  const {
    messages = [],
    status,
    error,
    stop,
    sendMessage,
  } = useChat({
    transport,
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChangeOverride = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLocalInput(e.target.value);
  };

  const handleSubmitOverride = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;
    
    // In SDK 6.0 sendMessage expects an object with a 'text' property
    sendMessage({ text: localInput });
    setLocalInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  useEffect(() => {
    if (isCriticalMode) {
      document.documentElement.classList.add('critical-mode');
    } else {
      document.documentElement.classList.remove('critical-mode');
    }
  }, [isCriticalMode]);

  return (
    <main className="flex flex-col h-screen w-full relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={cn(
          "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[100px] transition-all duration-1000",
          isCriticalMode ? "bg-red-800 scale-150" : "bg-blue-900"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px] transition-all duration-1000",
          isCriticalMode ? "bg-orange-900 scale-150" : "bg-indigo-900"
        )} />
      </div>

      {/* Header Container */}
      <header className="fixed top-0 w-full z-20 glass-panel border-b-0 border-vc-border backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
            isCriticalMode ? "bg-red-900/50 text-red-500 animate-pulse-ring" : "bg-blue-900/50 text-blue-400"
          )}>
            {isCriticalMode ? <Flame size={20} /> : <Briefcase size={20} />}
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white mb-0 leading-none">
              The Investor Board
            </h1>
            <p className="text-xs text-vc-muted mt-1 uppercase tracking-widest font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        <ToggleCritical
          isCriticalMode={isCriticalMode}
          onToggle={() => setIsCriticalMode((prev) => !prev)}
        />
      </header>

      {/* Chat Area Container */}
      <div className="flex flex-1 overflow-y-auto w-full pt-24 pb-32 scroll-smooth px-4">
        <div className="flex flex-col w-full max-w-3xl mx-auto space-y-6 min-h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto animate-float">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-vc-panel border border-vc-border mb-8 shadow-2xl relative">
                <Briefcase size={40} className="text-vc-muted" />
                {isCriticalMode && (
                  <Flame size={48} className="absolute text-red-500 animate-pulse -top-2 -right-2" />
                )}
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white mb-4">
                Pitch your startup.<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                  Get evaluated.
                </span>
              </h2>
              <p className={cn(
                "text-lg mb-8 transition-colors",
                isCriticalMode ? "text-red-400" : "text-vc-muted"
              )}>
                {isCriticalMode ? "Maximum skepticism. Zero mercy for flawed logic." : "Direct feedback. Rigorous market analysis."}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['AI Code Generator for Dogs', 'Web3 Tinder for Micro-Influencers', 'Uber but for getting Uber'].map((idea, i) => (
                  <button
                    key={i}
                    onClick={() => setLocalInput(idea)}
                    className="px-4 py-2 text-sm rounded-full glass-panel hover:bg-vc-panel border border-transparent hover:border-vc-accent/30 transition-all text-vc-muted hover:text-white"
                  >
                    "{idea}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence initial={false}>
                {messages.map((message: any, index: number) => (
                  <ChatMessage
                    key={message.id || String(index)}
                    message={message}
                    isCriticalMode={isCriticalMode}
                  />
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-vc-muted text-sm px-4 py-2 font-medium max-w-3xl mx-auto italic"
                >
                  <Briefcase size={16} className="animate-pulse" />
                  {isCriticalMode ? "Executing high-standard due diligence..." : "Analyzing market segment..."}
                </motion.div>
              )}
            </>
          )}
          
          {error && (
            <div className="flex flex-col items-center justify-center py-6 px-4">
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg p-4 text-center text-sm w-full max-w-md">
                <span className="block font-bold mb-1">Error</span>
                {error?.message || "Investor walked out. Try again."}
                <button
                  onClick={() => stop()}
                  className="block mt-2 w-full px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Form at Bottom */}
      <div className="fixed bottom-0 left-0 w-full z-20 pb-4 pt-8 bg-gradient-to-t from-vc-bg via-vc-bg/90 to-transparent">
        <ChatInput
          input={localInput}
          handleInputChange={handleInputChangeOverride}
          onSubmit={handleSubmitOverride}
          isLoading={isLoading}
          isCriticalMode={isCriticalMode}
        />
      </div>
    </main>
  );
}
