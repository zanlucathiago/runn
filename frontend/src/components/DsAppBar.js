import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function DsAppBar({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Runn Form
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
