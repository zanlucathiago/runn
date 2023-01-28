import { Container, Stack } from '@mui/material';
import DsBox from './DsBox';
import DsLoadingButton from './DsLoadingButton';
import DsStack from './DsStack';

export default function DsContainer({ children, onClick, maxWidth }) {
  return (
    <DsBox>
      <Container maxWidth={maxWidth}>
        <DsStack>
          {children}
          {onClick && (
            <Stack alignItems="flex-start">
              <DsLoadingButton onClick={onClick}>Salvar</DsLoadingButton>
            </Stack>
          )}
        </DsStack>
      </Container>
    </DsBox>
  );
}
