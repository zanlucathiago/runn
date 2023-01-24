import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

export default function DsLoadingButton({ children, onClick }) {
  const [loading, setLoading] = useState(false);

  const onClickSave = () => {
    setLoading(true);
    onClick().then((data) => {
      setLoading(false);
      return data;
    });
  };

  return (
    <LoadingButton
      color="secondary"
      loading={loading}
      onClick={onClickSave}
      variant="contained"
    >
      {children}
    </LoadingButton>
  );
}
