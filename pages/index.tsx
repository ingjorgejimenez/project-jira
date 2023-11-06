import { Layout } from '@/components/layouts';
import { EntryList, NewEntry } from '@/components/ui';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

export default function Home() {
  return (
    <Layout title='Open Jira - Jorge Jimenez'>
      <Typography
        variant='h1'
        color='primary'
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            sm={4}
            xs={12}
          >
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title='Pendientes' />
              <CardContent>
                {/* Agregar una nueva entrada */}
                <NewEntry />
                {/* Listado de las entradas */}
                <EntryList status='pending' />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            sm={4}
            xs={12}
          >
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title='Progreso' />
              <EntryList status='in-progress' />
            </Card>
          </Grid>
          <Grid
            item
            sm={4}
            xs={12}
          >
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title='Completadas' />
              <EntryList status='finished' />
            </Card>
          </Grid>
        </Grid>
      </Typography>
    </Layout>
  );
}
