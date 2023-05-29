import { Grid } from '@mui/material';

export default function DsCol({ children, size, sx }) {
  return (
    <Grid item xs={size} {...(sx ? { sx } : {})}>
      {children}
    </Grid>
  );
}
