import { useState, useEffect, useCallback } from 'react';
import { X, Star, Copy, Check } from 'lucide-react';

interface ZoomModalProps {
  fontName: string;
  text: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export function ZoomModal({ fontName, text, isFavorite, onToggleFavorite, onClose }: ZoomModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }, [text]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4">
            {fontName}
          </h2>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                  : 'text-gray-300 dark:text-gray-600 hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              title={isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              <Star className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Copy ASCII art"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-5">
          <pre className="ascii-art text-sm text-gray-800 dark:text-gray-200 whitespace-pre">
            {text}
          </pre>
        </div>
      </div>
    </div>
  );
}
