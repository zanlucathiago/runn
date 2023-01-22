import { Box, Container, Stack } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { SPACING } from '../contants';
import DsBox from './DsBox';
import DsStack from './DsStack';

export default function DsContainer({ children }) {
  return (
    <DsBox>
      <Container maxWidth="md">
        <DsStack>{children}</DsStack>
      </Container>
    </DsBox>
  );
}
