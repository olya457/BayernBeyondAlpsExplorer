import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type SavedLocationsValue = {
  savedIds: string[];
  hydrated: boolean;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
};

const storageKey = 'bayernBeyondAlps.savedLocations.v1';
const SavedLocationsContext = createContext<SavedLocationsValue | null>(null);

export function SavedLocationsProvider({children}: React.PropsWithChildren) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(storageKey)
      .then(value => {
        if (!mounted || !value) {
          return;
        }

        try {
          const parsed = JSON.parse(value);

          if (Array.isArray(parsed)) {
            setSavedIds(parsed.filter((item): item is string => typeof item === 'string'));
          }
        } catch {
          setSavedIds([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setHydrated(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback((next: string[]) => {
    AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch(() => undefined);
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSaved = useCallback(
    (id: string) => {
      setSavedIds(current => {
        const next = current.includes(id)
          ? current.filter(item => item !== id)
          : [id, ...current];

        persist(next);
        return next;
      });
    },
    [persist],
  );

  const removeSaved = useCallback(
    (id: string) => {
      setSavedIds(current => {
        const next = current.filter(item => item !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const clearSaved = useCallback(() => {
    setSavedIds([]);
    AsyncStorage.removeItem(storageKey).catch(() => undefined);
  }, []);

  const value = useMemo(
    () => ({
      savedIds,
      hydrated,
      isSaved,
      toggleSaved,
      removeSaved,
      clearSaved,
    }),
    [clearSaved, hydrated, isSaved, removeSaved, savedIds, toggleSaved],
  );

  return (
    <SavedLocationsContext.Provider value={value}>
      {children}
    </SavedLocationsContext.Provider>
  );
}

export function useSavedLocations() {
  const context = useContext(SavedLocationsContext);

  if (!context) {
    throw new Error('useSavedLocations must be used inside SavedLocationsProvider');
  }

  return context;
}
