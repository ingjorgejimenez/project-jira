import { createContext } from 'react';
import { Entry } from '@/interfaces';

interface ContextProps {
  entries: Entry[]; //todo: falta el tipo de datos del array
  //methods
  addNewEntry: (description: string) => void;
  updateEntries: (entry: Entry, showSnackbar?: boolean) => void;
  refreshEntries: () => Promise<void>;
  deleteEntries: (entry: Entry) => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps);
