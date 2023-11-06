import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { EntriesContext, entriesReducer } from '.';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
  entries: Entry[]; //-> Este es el estado
}

const Entries_INitial_STATE: EntriesState = {
  entries: [],
};

export interface PropsChildren {
  children: ReactNode;
}

export const EntriesProvider: FC<PropsChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INitial_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description: description,
    //   createdAt: Date.now(),
    //   status: 'pending',
    // };
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({ type: 'Entry - Add-Entry', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntries = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: 'Entry - Update-Entry', payload: data });
      if (showSnackbar) {
        enqueueSnackbar('Entries actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: 'Entry - Refresh-Entry', payload: data });
  };

  const deleteEntries = async ({ _id }: Entry) => {
    const { data } = await entriesApi.delete(`/entries/${_id}`);
    dispatch({ type: 'Entry - Delete-Entry', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //...method
        addNewEntry,
        updateEntries,
        refreshEntries,
        deleteEntries,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
