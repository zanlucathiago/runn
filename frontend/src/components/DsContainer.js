import { Container } from '@mui/material';
import DsBox from './DsBox';
import DsStack from './DsStack';

export default function DsContainer({ children, onClick }) {
  return (
    <DsBox>
      <Container maxWidth="md">
        <DsStack>{children}</DsStack>
      </Container>
    </DsBox>
  );
}
