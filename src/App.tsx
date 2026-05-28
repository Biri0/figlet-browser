import { useState } from 'react';
import { Header } from './components/Header';
import { FontGrid } from './components/FontGrid';
import { ZoomModal } from './components/ZoomModal';
import { useFonts } from './hooks/useFonts';
import { useFavorites } from './hooks/useFavorites';

const COLUMNS_KEY = 'figlet-browser-columns';

function getInitialColumns(): number {
  try {
    const raw = localStorage.getItem(COLUMNS_KEY);
    if (raw) return Math.max(1, Math.min(8, parseInt(raw, 10)));
  } catch {
    // ignore
  }
  // Default to 1 column on narrow viewports, 5 on desktop
  return window.innerWidth < 640 ? 1 : 5;
}

function App() {
  const [text, setText] = useState('Hello, World!');
  const [search, setSearch] = useState('');
  const [columns, setColumns] = useState(getInitialColumns);
  const [zoomedFont, setZoomedFont] = useState<string | null>(null);
  const { fontNames, getPreview, loading } = useFonts(text);
  const { favorites, toggle } = useFavorites();

  const handleColumnsChange = (value: number) => {
    setColumns(value);
    try {
      localStorage.setItem(COLUMNS_KEY, String(value));
    } catch {
      // ignore
    }
  };

  const zoomedPreview = zoomedFont ? getPreview(zoomedFont) : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        text={text}
        onTextChange={setText}
        search={search}
        onSearchChange={setSearch}
        columns={columns}
        onColumnsChange={handleColumnsChange}
      />
      <main className="flex-1 max-w-[90rem] mx-auto w-full px-2">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-400">
            Loading fonts...
          </div>
        ) : (
          <FontGrid
            fontNames={fontNames}
            getPreview={getPreview}
            favorites={favorites}
            toggleFavorite={toggle}
            search={search}
            columns={columns}
            onZoom={setZoomedFont}
          />
        )}
      </main>
      <footer className="text-center py-4 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-200 dark:border-gray-700">
        {fontNames.length} fonts available · {favorites.size} pinned · {columns} {columns === 1 ? 'column' : 'columns'}
      </footer>

      {zoomedPreview && (
        <ZoomModal
          fontName={zoomedPreview.name}
          text={zoomedPreview.text}
          isFavorite={favorites.has(zoomedPreview.name)}
          onToggleFavorite={() => toggle(zoomedPreview.name)}
          onClose={() => setZoomedFont(null)}
        />
      )}
    </div>
  );
}

export default App;
