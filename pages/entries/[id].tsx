import { GetServerSideProps } from 'next';
import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
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
  capitalize,
} from '@mui/material';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

export const EntryPage = ({ entry }: Props) => {
  const router = useRouter();
  const { updateEntries, deleteEntries } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]); //esto se hace cuando una validación se repite muchas veces en un formulario

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };
  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    updateEntries(
      {
        ...entry,
        description: inputValue,
        status,
      },
      true
    );
    router.push('/');
  };
  const handleDelete = () => {
    deleteEntries(entry);
    router.push('/');
  };

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
        >
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
                value={inputValue}
                onChange={onInputValueChange}
                helperText={isNotValid && 'Ingrse un valor'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel> Status:</FormLabel>
                <RadioGroup
                  row
                  onChange={onStatusChange}
                  value={status}
                >
                  {validStatus.map(option => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant='contained'
                onClick={onSave}
                disabled={inputValue.length <= 0}
              ></Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ctx => {
  // const { data } = await  // your fetch function here
  const { id } = ctx.params as { id: string };
  const entry = await dbEntries.getEntryById(id);
  console.log(id);
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      entry: entry,
    },
  };
};

export default EntryPage;
