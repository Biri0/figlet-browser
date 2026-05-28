import { Star, Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import type { FontPreview } from '../types';

interface FontCardProps {
  preview: FontPreview;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function FontCard({ preview, isFavorite, onToggleFavorite }: FontCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!preview.text) return;
    try {
      await navigator.clipboard.writeText(preview.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }, [preview.text]);

  return (
    <div className="font-card relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 hover:border-indigo-400 dark:hover:border-indigo-500">
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 truncate">
          {preview.name}
        </span>
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={onToggleFavorite}
            className={`p-1 rounded transition-colors ${
              isFavorite
                ? 'text-amber-400 hover:text-amber-500'
                : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'
            }`}
            title={isFavorite ? 'Unfavorite' : 'Favorite'}
          >
            <Star className="w-3.5 h-3.5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-gray-400 hover:text-indigo-500 transition-colors"
            title="Copy ASCII art"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
      <div className="min-h-[3rem]">
        {preview.loading ? (
          <div className="space-y-1 animate-pulse">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
        ) : (
          <pre className="ascii-art text-[10px] text-gray-800 dark:text-gray-200 whitespace-pre">
            {preview.text}
          </pre>
        )}
      </div>
    </div>
  );
}
