import { useState, useEffect, useRef, useCallback } from 'react';
import figlet from 'figlet';
import type { FontPreview } from '../types';

const BATCH_SIZE = 12;
const BATCH_DELAY_MS = 50;

export function useFonts(inputText: string) {
  const [fontNames, setFontNames] = useState<string[]>([]);
  const [previews, setPreviews] = useState<Map<string, FontPreview>>(new Map());
  const [loading, setLoading] = useState(true);
  const textRef = useRef(inputText);

  // Load font list once
  useEffect(() => {
    figlet.fonts((err, fonts) => {
      if (err || !fonts) {
        setFontNames([]);
        setLoading(false);
        return;
      }
      const names = fonts as string[];
      setFontNames(names);

      const initial = new Map<string, FontPreview>();
      for (const name of names) {
        initial.set(name, { name, text: '', loading: true });
      }
      setPreviews(initial);
      setLoading(false);
    });
  }, []);

  // Render fonts in batches whenever inputText changes
  useEffect(() => {
    if (fontNames.length === 0) return;
    textRef.current = inputText;

    // Reset all to loading
    setPreviews((prev) => {
      const next = new Map(prev);
      for (const name of fontNames) {
        next.set(name, { name, text: '', loading: true });
      }
      return next;
    });

    let cancelled = false;
    let index = 0;

    function processBatch() {
      if (cancelled) return;
      const currentText = textRef.current;
      const batch = fontNames.slice(index, index + BATCH_SIZE);

      batch.forEach((fontName) => {
        figlet.text(
          currentText || ' ',
          { font: fontName },
          (err, data) => {
            if (cancelled) return;
            setPreviews((prev) => {
              const next = new Map(prev);
              next.set(fontName, {
                name: fontName,
                text: err || !data ? `Error: ${fontName}` : data,
                loading: false,
              });
              return next;
            });
          }
        );
      });

      index += BATCH_SIZE;
      if (index < fontNames.length) {
        setTimeout(processBatch, BATCH_DELAY_MS);
      }
    }

    processBatch();

    return () => {
      cancelled = true;
    };
  }, [fontNames, inputText]);

  const getPreview = useCallback(
    (name: string): FontPreview | undefined => previews.get(name),
    [previews]
  );

  return { fontNames, getPreview, loading };
}
