import { UIState } from '.';

type UIActionType =
  | { type: 'UI-open Sidebar'; payload?: string }
  | { type: 'UI-close Sidebar'; payload?: string }
  | { type: 'UI-toggle Entry'; payload: boolean }
  | { type: 'UI-toggle Dragging'; payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI-open Sidebar':
      return {
        ...state,
        sidemenuOpen: true,
      };
    case 'UI-close Sidebar':
      return {
        ...state,
        sidemenuOpen: false,
      };
    case 'UI-toggle Entry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case 'UI-toggle Dragging':
      return {
        ...state,
        isDragging: action.payload,
      };
    default:
      return state;
  }
};
