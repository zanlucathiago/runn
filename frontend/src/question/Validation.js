import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, MenuItem, Stack, Tooltip } from '@mui/material';
import DsCol from '../components/DsCol';
import DsRow from '../components/DsRow';
import DsSelect from '../components/DsSelect';
import { EXPRESSIONS, OPERATORS } from '../constants/contants';

export default function Validation({
  onChange,
  onClickDelete,
  operator,
  expression,
}) {
  return (
    <Stack>
      <DsRow>
        <DsCol size={6}>
          <DsSelect
            onChange={onChange('operator')}
            size="small"
            value={operator}
          >
            {OPERATORS.map((f) => (
              <MenuItem key={f.value} value={f.value}>
                {f.text}
              </MenuItem>
            ))}
          </DsSelect>
        </DsCol>
        <DsCol size={5}>
          <DsSelect
            onChange={onChange('expression')}
            size="small"
            value={expression}
          >
            {EXPRESSIONS.map((f) => (
              <MenuItem key={f.value} value={f.value}>
                {f.text}
              </MenuItem>
            ))}
          </DsSelect>
        </DsCol>
        <DsCol size={1}>
          <Tooltip title="Excluir">
            <IconButton onClick={onClickDelete}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </DsCol>
      </DsRow>
    </Stack>
  );
}
