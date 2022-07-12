import React, { useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const INITIAL_STATE = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const UIProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE)

    const openSidebar = () => {
        dispatch({type: 'openSidebar'})
    }

    const closeSidebar = () => {
        dispatch({type: 'closeSidebar'})
    }

    const draggingStart = () => {
        dispatch({type: 'startDragging'})
    }

    const draggindEnd = () => {
        dispatch({type: 'endDragging'})
    }


    const setIsAddingEntry = (value: boolean) => {
        dispatch({
            type: "setIsAdding",
            payload: value
        })
    }

    return (
        <UIContext.Provider
          value={{
              ...state,
              openSidebar,
              closeSidebar,
              setIsAddingEntry,
              draggingStart,
              draggindEnd
          }}
        >
            {children}
        </UIContext.Provider>
    )
}