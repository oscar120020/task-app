import { Entry, EntryStatus } from "../../interfaces";
import { EntriesState } from "./EntriesProvider";

type MoveEntryType = {_id: string, status: EntryStatus}

type ActionType =
  | { type: "addEntry"; payload: Entry }
  | { type: "updateEntry"; payload: Entry }
  | { type: "loadEntrys"; payload: Entry[] };

export const entriesReducer = (
  state: EntriesState,
  action: ActionType
): EntriesState => {
  switch (action.type) {
    case "loadEntrys":
      return {
        ...state,
        entries: [...action.payload],
      };

    case "addEntry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "updateEntry":
      return {
        ...state,
        entries: state.entries.map(entry => {
            if(entry._id === action.payload._id){
                entry.status = action.payload.status
                entry.description = action.payload.description
            }
            return entry
        }),
      };

    default:
      return state;
  }
};
