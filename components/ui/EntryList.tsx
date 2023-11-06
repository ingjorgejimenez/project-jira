import { List, Paper } from '@mui/material';
import { DragEvent, ReactNode, useContext, useMemo, useState } from 'react';
import { EntryCard } from '.';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { lightTheme } from '../../themes/light-theme';
import { UIContext } from '@/context/ui';
import styles from './EntryList.module.css';
interface Props {
  children?: ReactNode;
  status: EntryStatus;
}
export const EntryList = ({ status }: Props) => {
  const { entries, updateEntries } = useContext(EntriesContext);
  const { setIsDraggingEntry } = useContext(UIContext);
  const { isDragging } = useContext(UIContext);
  const [dropHover, setDropHover] = useState(false);
  const entriesByStatus = useMemo(() => {
    return entries.filter(entry => entry.status == status);
  }, [entries]); //-> esto se memoriza y no se rerendering a menos que entries cambie

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDropHover(true);
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status;
    updateEntries(entry);
    setDropHover(false);
    setIsDraggingEntry(false);
  };

  return (
    //Todo: aquí haremos drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      onDragLeave={() => setDropHover(false)}
      className={`${isDragging ? styles.dragging : ''} ${
        dropHover ? styles.draggingHover : ''
      }`}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '1rem',
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map(entry => (
            <EntryCard
              key={entry._id}
              entry={entry}
            />
          ))}
        </List>
      </Paper>
    </div>
  );
};
