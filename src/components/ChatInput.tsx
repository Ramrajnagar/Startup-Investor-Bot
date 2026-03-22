import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isCriticalMode: boolean;
}

export function ChatInput({ input, handleInputChange, onSubmit, isLoading, isCriticalMode }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        // Build an artificial event with standard form methods to pass
        const formEvent = {
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>;
        onSubmit(formEvent);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl max-w-2xl mx-auto p-4 border-t border-vc-border/50 bg-vc-bg/95 backdrop-blur-md">
      <form
        onSubmit={onSubmit}
        className={cn(
          "relative flex items-end gap-2 p-2 rounded-2xl glass-panel focus-within:ring-2 focus-within:ring-vc-accent/50 transition-all",
          isCriticalMode ? "focus-within:ring-roast-accent/50" : ""
        )}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isCriticalMode ? "Describe your model for a rigorous audit..." : "Pitch your startup. What is the core problem and market size?"}
          className="w-full max-h-[150px] min-h-[52px] bg-transparent text-vc-text placeholder:text-vc-muted resize-none outline-none py-3 px-4"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={cn(
            "h-12 w-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
            isCriticalMode 
              ? "bg-roast-accent text-white hover:bg-red-600 disabled:bg-gray-800"
              : "bg-white text-vc-bg hover:bg-gray-200 disabled:bg-vc-panel disabled:text-vc-muted"
          )}
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>
      <div className="text-center mt-2 text-xs text-vc-muted font-medium tracking-wide opacity-50 uppercase">
        Objective Analysis Protocol Active
      </div>
    </div>
  );
}
