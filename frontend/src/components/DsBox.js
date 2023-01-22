import { Box } from '@mui/material';
import { SPACING } from '../contants';

export default function DsBox({ children, ...props }) {
  return <Box sx={{ p: SPACING, ...props }}>{children}</Box>;
}
