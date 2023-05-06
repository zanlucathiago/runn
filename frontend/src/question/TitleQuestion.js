import { Stack, Typography } from '@mui/material';
import DsFilledTextField from '../components/DsFilledTextField';
import DsDeleteIconButton from '../components/DsDeleteIconButton';
import DsStandardTextField from '../components/DsStandardTextField';
import DsDescription from '../components/DsDescription';
import { SPACING } from '../constants/contants';

export default function TitleQuestion({
  selected,
  onChange,
  title,
  onClickDelete,
  description,
  children,
}) {
  return selected ? (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={SPACING}
      >
        <DsFilledTextField
          onChange={onChange('title')}
          placeholder="Título"
          value={title}
        />
        <DsDeleteIconButton onClick={onClickDelete} />
      </Stack>
      <DsStandardTextField
        onChange={onChange('description')}
        placeholder="Descrição (opcional)"
        value={description}
      />
      {children}
    </>
  ) : (
    <>
      <Typography>{title || 'Título'}</Typography>
      <DsDescription>{description || 'Descrição (opcional)'}</DsDescription>
      {children}
    </>
  );
}
