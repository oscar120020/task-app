import { ChangeEvent, useContext, useMemo, useState } from "react";
import { Layout } from "../../components/layouts";
import { GetServerSideProps } from 'next'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import { Entry, EntryStatus, MessageResponse } from "../../interfaces";
import { capitalize } from "../../helpers/capitalize";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { entriesApi } from "../../apis";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getFormatDistance } from "../../helpers";

const validStarus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry
}

const EntryPage = ({entry}: Props) => {

  const { updateEntry, refreshEntries } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const handleSave = () => {
    if(inputValue.trim().length === 0) return;
    
    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    }
    updateEntry(updatedEntry, true)
  }

  const handleDelete = async() => {
    try {
      const {data} = await entriesApi.delete<MessageResponse>(`/entries/${entry._id}`);

      if(data){
        await refreshEntries()

        setTimeout(() => {
          router.push("/")
        }, 2000)

        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 2000,
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

  return (
    <Layout title={inputValue.substring(0, 15) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue.substring(0, 25)}...`}
              subheader={"Creada " + getFormatDistance(entry.createdAt)}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus={true}
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={handleChange}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
                onBlur={() => setTouched(true)}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup onChange={onStatusChange} value={status} row>
                  {validStarus.map((state) => (
                    <FormControlLabel
                      key={state}
                      value={state}
                      control={<Radio />}
                      label={capitalize(state)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                onClick={handleSave}
                startIcon={<SaveIcon />}
                variant="contained"
                fullWidth
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <IconButton
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "error.dark",
          }}
          size="large"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { id } = params as {id: string} ;

    const entry = await dbEntries.getEntryById(id);

    if(!entry){
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      }
    }

    return {
        props: {entry}
    }
}

export default EntryPage;
