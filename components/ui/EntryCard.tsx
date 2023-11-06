import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { DragEvent, useContext } from 'react';
import { UIContext } from '@/context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

interface Props {
  entry: Entry;
}
export const EntryCard = ({ entry }: Props) => {
  const { isDragging, setIsDraggingEntry } = useContext(UIContext);
  const router = useRouter();
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id);
    setIsDraggingEntry(true);
  };

  const onDragEnd = () => {
    // TODO: cancelar drag
    setIsDraggingEntry(false);
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{ opacity: isDragging ? 0.6 : 1, transition: 'all 0.5 ease' }}
      //eventos de drag
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent style={{ padding: '1rem 2rem' }}>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions>
          <Typography
            variant='body2'
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
