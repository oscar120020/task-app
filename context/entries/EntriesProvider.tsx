import React, { useEffect, useReducer } from "react";
import { Entry, EntryStatus } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

const INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE);
  const {enqueueSnackbar} = useSnackbar();

  const addEntry = async(description: string) => {

    const { data } = await entriesApi.post<Entry>("/entries", {description})

    dispatch({
      type: "addEntry",
      payload: data,
    });
  };

  const updateEntry = async({_id, description, status}: Entry, showSnackbar = false) => { 
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})

      dispatch({
        type: "updateEntry",
        payload: data
      })

      if(showSnackbar){
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        })
      }
    } catch (error) {
      console.log(error);
      
    }

  }

  const refreshEntries = async() => {
    const { data } = await entriesApi.get<Entry[]>("/entries");

    dispatch({
      type: "loadEntrys",
      payload: data
    })
    
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
        refreshEntries
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
