import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

export default function DsLoadingButton({ onClick }) {
  const [loading, setLoading] = useState(false);

  const onClickSave = () => {
    setLoading(true);
    onClick().then(() => setLoading(false));
  };

  return (
    <LoadingButton
      color="secondary"
      loading={loading}
      onClick={onClickSave}
      variant="contained"
    >
      Salvar
    </LoadingButton>
  );
}
