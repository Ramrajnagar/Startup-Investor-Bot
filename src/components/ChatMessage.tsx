import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Briefcase, UserRound } from 'lucide-react';
import { ScoreBadge } from './ScoreBadge';
import { cn } from '@/lib/utils';
interface ChatMessageProps {
  message: any;
  isCriticalMode: boolean;
}

export function ChatMessage({ message, isCriticalMode }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const content = typeof message.content === 'string' 
    ? message.content 
    : Array.isArray(message.content)
      ? message.content.map((p: any) => p.text || (typeof p === 'string' ? p : '')).join('')
      : String(message.content || '');

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find score inside text: looks for patterns like "*Score:* 4/10" or "Score: 7.5/10" or "4/10"
  // Since format specifies point 4 is Score (/10), we can extract the number.
  let matchedScore: number | null = null;
  const scoreMatch = content.match(/(?:Score:?.*?\s)?(\d+(?:\.\d+)?)\s*\/\s*10/i);
  if (scoreMatch && !isUser) {
    matchedScore = parseFloat(scoreMatch[1]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={cn(
        "flex w-full gap-4 max-w-4xl max-w-2xl mx-auto py-6",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2",
        isUser 
          ? "bg-vc-panel border-vc-muted text-white" 
          : "bg-vc-panel text-white shadow-lg relative glow",
        !isUser && isCriticalMode ? "border-roast-accent shadow-red-500/50" : "border-vc-accent shadow-blue-500/20"
      )}>
        {isUser ? <UserRound size={20} /> : <Briefcase size={20} />}
        {!isUser && isCriticalMode && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        )}
      </div>

      <div className={cn(
        "flex flex-col gap-2 max-w-[85%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-5 py-4 rounded-2xl text-sm leading-relaxed",
          isUser 
            ? "bg-vc-panel border border-vc-border text-white rounded-tr-none" 
            : "glass-panel text-white shadow-sm rounded-tl-none relative",
          !isUser && isCriticalMode ? "border-red-900/30 shadow-red-900/10" : ""
        )}>
          {!isUser && (
            <div className="absolute top-2 right-2">
              <button
                onClick={handleCopy}
                className="p-1 rounded bg-transparent hover:bg-white/10 text-vc-muted transition focus:outline-none"
                title="Copy to clipboard"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
          )}
          
          {matchedScore !== null && !isUser && (
            <div className="mb-4">
              <ScoreBadge score={matchedScore} />
            </div>
          )}

          <div className="prose prose-invert prose-sm max-w-none 
            prose-p:leading-relaxed prose-p:mb-3 
            prose-li:mb-1 prose-ul:mb-4 prose-ol:mb-4 
            prose-headings:text-white prose-headings:font-semibold prose-strong:text-white prose-strong:font-bold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
