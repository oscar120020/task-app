import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { DragEvent, useContext } from "react";
import { UIContext } from "../../context/ui";
import { getFormatDistance } from "../../helpers";
import { Entry } from "../../interfaces";

export const EntryCard = ({ description, _id , createdAt }: Entry) => {

  const { draggingStart, draggindEnd } = useContext(UIContext)
  const router = useRouter();
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", _id)
    draggingStart()
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    draggindEnd()
  }

  const handleClick = () => {
    router.push(`/entries/${_id}`)
  }
    
  return (
    <Card 
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2">{getFormatDistance(createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
