import { Stack } from '@mui/material';
import { SPACING } from '../constants/contants';

export default function DsStack({ children }) {
  return <Stack spacing={SPACING}>{children}</Stack>;
}
