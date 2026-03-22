import { cn } from '@/lib/utils';
import { Target } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  let colorClass = 'bg-red-500/20 text-red-500 border-red-500/50';
  let label = 'Doomed';

  if (score >= 8) {
    colorClass = 'bg-green-500/20 text-green-400 border-green-500/50';
    label = 'Unicorn Tier';
  } else if (score >= 5) {
    colorClass = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    label = 'Seed Candidate';
  } else {
    colorClass = 'bg-red-500/20 text-red-500 border-red-500/50';
    label = 'Hard Pass';
  }

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-bold shadow-sm',
      colorClass
    )}>
      <Target size={16} />
      <span>{score}/10</span>
      <span className="opacity-75 font-normal ml-1">({label})</span>
    </div>
  );
}
