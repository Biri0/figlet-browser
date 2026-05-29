import { Search, Columns3 } from 'lucide-react';

interface HeaderProps {
  text: string;
  onTextChange: (text: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  columns: number;
  onColumnsChange: (columns: number) => void;
}

export function Header({ text, onTextChange, search, onSearchChange, columns, onColumnsChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-3">
      <div className="max-w-[90rem] mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white shrink-0">
          Figlet Browser
        </h1>
        <input
          type="text"
          aria-label="Preview text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Type something..."
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
        />
        <div className="flex items-center gap-2 min-w-0 sm:shrink-0">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              aria-label="Filter fonts"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter fonts..."
              className="w-full sm:w-44 pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Columns3 className="w-4 h-4 text-gray-400" />
            <select
              aria-label="Grid columns"
              value={columns}
              onChange={(e) => onColumnsChange(Number(e.target.value))}
              className="py-2 pl-2 pr-7 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none cursor-pointer"
              style={{ backgroundImage: 'none' }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
