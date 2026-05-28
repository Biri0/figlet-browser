import { Search } from 'lucide-react';

interface HeaderProps {
  text: string;
  onTextChange: (text: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

export function Header({ text, onTextChange, search, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white shrink-0">
          Figlet Browser
        </h1>
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Type something..."
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
        />
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter fonts..."
            className="w-full sm:w-48 pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
      </div>
    </header>
  );
}
