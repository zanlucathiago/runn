import { AppBar, Box, Link, Toolbar } from '@mui/material';
import DsLoadingButton from './DsLoadingButton';

export default function DsAppBar({ onClick, text }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link color="#FFF" href="/" underline="none" variant="h6">
              Runn Form
            </Link>
          </Box>
          <DsLoadingButton onClick={onClick}>{text}</DsLoadingButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
