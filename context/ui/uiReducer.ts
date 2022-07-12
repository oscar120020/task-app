import { UIState } from "./UIProvider";

type ActionType = 
| { type: "openSidebar" }
| { type: "closeSidebar" }
| { type: "startDragging"}
| { type: "endDragging"}
| { type: "setIsAdding", payload: boolean}

export const uiReducer = (state: UIState, action: ActionType): UIState => {
  switch (action.type) {
    case "openSidebar":
      return {
        ...state,
        sideMenuOpen: true,
      };

    case "closeSidebar":
      return {
        ...state,
        sideMenuOpen: false,
      };
    
    case "setIsAdding": {
      return {
        ...state,
        isAddingEntry: action.payload
      }
    }

    case "startDragging":
      return {
        ...state,
        isDragging: true,
      };

    case "endDragging":
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
