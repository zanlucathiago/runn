import ClearIcon from '@mui/icons-material/Clear';
import Icons from '../icons/icons';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { MODELS, SPACING } from '../constants/contants';

export default function TemplateOption({
  index,
  model,
  children,
  onClick,
  selected,
}) {
  const IconComponent =
    MODELS[model].option.icon && Icons[MODELS[model].option.icon];
  return (
    <Stack direction="row" alignItems="center" spacing={SPACING}>
      {IconComponent ? (
        <IconComponent />
      ) : (
        <Typography>{index + 1}.</Typography>
      )}
      {children}
      {selected && onClick && (
        <Tooltip title="Excluir">
          <IconButton onClick={onClick}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
