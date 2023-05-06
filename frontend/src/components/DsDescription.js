import { Box, Typography } from '@mui/material';

export default function DsDescription({ children, hidden }) {
  return hidden ? null : (
    <Box sx={{ color: '#70757a' }}>
      <Typography>{children}</Typography>
    </Box>
  );
}
