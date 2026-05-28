import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'figlet-browser-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return new Set<string>(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
    return new Set<string>();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch {
      // Silently degrade to in-memory state when storage is unavailable
    }
  }, [favorites]);

  const toggle = useCallback((fontName: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(fontName)) {
        next.delete(fontName);
      } else {
        next.add(fontName);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (fontName: string) => favorites.has(fontName),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}
