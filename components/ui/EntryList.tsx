import { EntryCard } from "./";
import { List, Paper } from "@mui/material";
import { EntryStatus } from "../../interfaces";
import { DragEvent, useCallback, useContext, useMemo, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, draggindEnd } = useContext(UIContext);
  const [isIn, setIsIn] = useState(false)

  const entriesByStatus = useMemo(() => entries?.filter((entry) => entry.status === status), [entries, status])

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text")

    const entry = entries.find(entry => entry._id === id)!
    entry.status = status

    updateEntry(entry)
    draggindEnd()
    setIsIn(false)
  }

  const allawDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsIn(true)
  }

  const allawDropEnd = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsIn(false)
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allawDrop}
      onDragLeave={allawDropEnd}
      className={`${isDragging ? styles.dragging : ""} ${isIn ? styles.dragging_now : ""}`}
    >
      <Paper
        className="custom-scroll"
        sx={{
          height: `calc(100vh - ${status === "pending" ? "240px" : "190px"})`,
          overflowY: "scroll",
          backgroundColor: "transparent",
          paddingBottom: 1
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s", padding: "10px" }}>
          {
              entriesByStatus?.map(entry => (
                <EntryCard key={entry._id} {...entry} />
              ))
          }

        </List>
      </Paper>
    </div>
  );
};
