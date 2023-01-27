import { Container } from '@mui/material';
import DsBox from './DsBox';
import DsStack from './DsStack';

export default function DsContainer({ children, maxWidth }) {
  return (
    <DsBox>
      <Container maxWidth={maxWidth}>
        <DsStack>{children}</DsStack>
      </Container>
    </DsBox>
  );
}
