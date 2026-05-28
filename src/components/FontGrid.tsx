import { FontCard } from './FontCard';
import type { FontPreview } from '../types';

interface FontGridProps {
  fontNames: string[];
  getPreview: (name: string) => FontPreview | undefined;
  favorites: Set<string>;
  toggleFavorite: (name: string) => void;
  search: string;
  columns: number;
  onZoom: (fontName: string) => void;
}

export function FontGrid({ fontNames, getPreview, favorites, toggleFavorite, search, columns, onZoom }: FontGridProps) {
  const filtered = fontNames.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aFav = favorites.has(a) ? 1 : 0;
    const bFav = favorites.has(b) ? 1 : 0;
    if (aFav !== bFav) return bFav - aFav;
    return a.localeCompare(b);
  });

  if (sorted.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        No fonts match your search.
      </div>
    );
  }

  return (
    <div className="grid gap-3 py-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {sorted.map((name) => {
        const preview = getPreview(name);
        return (
          <FontCard
            key={name}
            preview={preview ?? { name, text: '', loading: true }}
            isFavorite={favorites.has(name)}
            onToggleFavorite={() => toggleFavorite(name)}
            onZoom={() => onZoom(name)}
          />
        );
      })}
    </div>
  );
}
