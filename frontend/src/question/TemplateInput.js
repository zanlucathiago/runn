import { Button, Stack, Typography } from '@mui/material';
import DsTextField from '../components/DsTextField';
import { MODELS, SPACING } from '../constants/contants';
import TemplateOption from './TemplateOption';

export default function TemplateInput({
  children,
  length,
  model,
  other,
  onClickAdd,
  onClickOther,
  selected,
}) {
  return MODELS[model].option ? (
    <Stack spacing={SPACING}>
      {children}
      {model !== MODELS.DROPDOWN.value && other && (
        <TemplateOption
          model={model}
          selected={selected}
          onClick={onClickOther}
        >
          {selected ? (
            <DsTextField value="Outros..." variant="standard" disabled />
          ) : (
            <Typography>Outros...</Typography>
          )}
        </TemplateOption>
      )}
      {selected && (
        <TemplateOption index={length} model={model}>
          <Button onClick={onClickAdd}>Adicionar opção</Button>
          {model !== MODELS.DROPDOWN.value && !other && (
            <>
              <Typography>ou</Typography>
              <Button onClick={onClickOther}>adicionar "Outro"</Button>
            </>
          )}
        </TemplateOption>
      )}
    </Stack>
  ) : (
    <DsTextField
      value={MODELS[model].placeholder}
      variant="standard"
      disabled
    />
  );
}
