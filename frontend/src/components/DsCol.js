import { Grid } from '@mui/material';

export default function DsCol({ children, size }) {
  return (
    <Grid item xs={size}>
      {children}
    </Grid>
  );
}
