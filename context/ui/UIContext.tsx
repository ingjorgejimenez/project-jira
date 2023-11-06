import { createContext } from 'react';

interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  //Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (nweEntry: boolean) => void;
  setIsDraggingEntry: (dragging: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
