import LoadingButton from '@mui/lab/LoadingButton';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import DsBox from './DsBox';
import DsStack from './DsStack';

export default function DsContainer({ children, onClick }) {
  const [loading, setLoading] = useState(false);
  const onClickSave = () => {
    setLoading(true);
    onClick().then(() => setLoading(false));
  };
  return [
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Runn Form
          </Typography>
          <LoadingButton
            color="secondary"
            loading={loading}
            onClick={onClickSave}
            variant="contained"
          >
            Salvar
          </LoadingButton>
        </Toolbar>
      </AppBar>
    </Box>,
    <DsBox>
      <Container maxWidth="md">
        <DsStack>{children}</DsStack>
      </Container>
    </DsBox>,
  ];
}
