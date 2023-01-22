import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';

export default function DsDeleteIconButton({ onClick }) {
  return (
    <Tooltip title="Excluir">
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
