import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function DsCircularProgress({ action, children }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    action().then(() => setLoading(false));
  }, []);

  return loading ? (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  ) : (
    children
  );
}
