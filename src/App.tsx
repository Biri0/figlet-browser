import { useState } from 'react';
import { Header } from './components/Header';
import { FontGrid } from './components/FontGrid';
import { useFonts } from './hooks/useFonts';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const [text, setText] = useState('Hello, World!');
  const [search, setSearch] = useState('');
  const { fontNames, getPreview, loading } = useFonts(text);
  const { favorites, toggle } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        text={text}
        onTextChange={setText}
        search={search}
        onSearchChange={setSearch}
      />
      <main className="flex-1 max-w-7xl mx-auto w-full">
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
          />
        )}
      </main>
      <footer className="text-center py-4 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-200 dark:border-gray-700">
        {fontNames.length} fonts available · {favorites.size} pinned
      </footer>
    </div>
  );
}

export default App;
