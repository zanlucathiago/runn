import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export default function DsCircularProgress({ action, children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    action().then(() => setLoading(false));
  }, []);

  return loading ? (
    <Stack alignItems="center">
      <CircularProgress />
    </Stack>
  ) : (
    children
  );
}
