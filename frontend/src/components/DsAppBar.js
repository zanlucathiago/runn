import { AppBar, Box, Link, Toolbar } from '@mui/material';
import DsLoadingButton from './DsLoadingButton';

export default function DsAppBar({ onClick, text }) {
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
          <DsLoadingButton onClick={onClick}>{text}</DsLoadingButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
