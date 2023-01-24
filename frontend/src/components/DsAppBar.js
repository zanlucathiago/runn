import { AppBar, Box, Link, Toolbar } from '@mui/material';

export default function DsAppBar({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Link
            color="#FFF"
            href="/"
            underline="none"
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Runn Form
          </Link>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
