import { Grid } from '@mui/material';

export default function DsRow({ children }) {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
}
