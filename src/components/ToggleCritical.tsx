import { cn } from '@/lib/utils';
import { ShieldAlert } from 'lucide-react';

interface ToggleCriticalProps {
  isCriticalMode: boolean;
  onToggle: () => void;
}

export function ToggleCritical({ isCriticalMode, onToggle }: ToggleCriticalProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-9 w-44 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75',
        isCriticalMode ? 'bg-red-600' : 'bg-gray-800'
      )}
      role="switch"
      aria-checked={isCriticalMode}
    >
      <span className="sr-only">Toggle Critical Mode</span>
      
      {/* Dynamic text inside switch */}
      <span
        className={cn(
          'absolute inset-y-0 left-0 flex items-center pl-3 text-[10px] font-bold uppercase tracking-wider text-white transition-opacity duration-300',
          isCriticalMode ? 'opacity-100' : 'opacity-0'
        )}
      >
        <span className="flex items-center gap-1">
          <ShieldAlert size={14} className="animate-pulse" />
          Critical Mode
        </span>
      </span>

      <span
        className={cn(
          'absolute inset-y-0 right-0 flex items-center pr-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 transition-opacity duration-300',
          !isCriticalMode ? 'opacity-100' : 'opacity-0'
        )}
      >
        Standard Mode
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out',
          isCriticalMode ? 'translate-x-[140px] bg-red-100' : 'translate-x-0 bg-gray-300'
        )}
      />
    </button>
  );
}
