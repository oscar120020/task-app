import { createContext } from 'react'

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    draggingStart: () => void;
    draggindEnd: () => void;
    setIsAddingEntry: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps)