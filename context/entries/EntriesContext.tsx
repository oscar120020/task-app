import { createContext } from 'react'
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];
    addEntry: (description: string) => Promise<void>;
    updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
    refreshEntries: () => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps)