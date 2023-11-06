import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from '.';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INitial_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export interface PropsChildren {
  children: ReactNode;
}

export const UIProvider: FC<PropsChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INitial_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI-open Sidebar' });
  };
  const closeSideMenu = () => {
    dispatch({ type: 'UI-close Sidebar' });
  };
  const setIsAddingEntry = (newEntry: boolean) => {
    dispatch({ type: 'UI-toggle Entry', payload: newEntry });
  };
  const setIsDraggingEntry = (dragging: boolean) => {
    dispatch({ type: 'UI-toggle Dragging', payload: dragging });
  };
  return (
    <UIContext.Provider
      value={{
        ...state,
        //method
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        setIsDraggingEntry,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
