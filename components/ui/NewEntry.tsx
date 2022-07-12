import { Box, Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {

  const { addEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (!inputValue.length) return;
    addEntry(inputValue)
    setInputValue("")
    setTouched(false)
    setIsAddingEntry(false)
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1.5 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 1, marginBottom: 1 }}
            placeholder="Nueva entrada"
            multiline
            autoFocus
            label="Nueva entrada"
            color="secondary"
            helperText={
              inputValue.length === 0 && touched && "Ingrese una entrada"
            }
            error={inputValue.length === 0 && touched}
            value={inputValue}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={onSave}
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddCircleIcon />}
          fullWidth
          variant="outlined"
        >
          Agregar entrada
        </Button>
      )}
    </Box>
  );
};
