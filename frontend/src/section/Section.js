import { Stack, Typography } from '@mui/material';
import DsBox from '../components/DsBox';
import DsCard from '../components/DsCard';
import DsDeleteIconButton from '../components/DsDeleteIconButton';
import DsStandardTextField from '../components/DsStandardTextField';
import DsDescription from '../components/DsDescription';

export default function Section({
  children,
  description,
  editable = false,
  index,
  length,
  onChange,
  onClick,
  onDelete,
  selected = false,
  title,
}) {
  const placeholder = index
    ? 'Descrição (opcional)'
    : 'Descrição do formulário';

  const displayTitle =
    title || (index ? 'Seção sem título' : 'Formulário sem título');

  return (
    <>
      <div>
        {length > 1 && (
          <DsBox
            width="fit-content"
            bgcolor="secondary.main"
            color="white"
            py={1}
            borderRadius="11px 11px 0 0"
          >
            <Typography variant="body2">
              Seção {index + 1} de {length}
            </Typography>
          </DsBox>
        )}
        <DsCard onClick={onClick}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {selected ? (
              <DsStandardTextField
                fontSize={!index && 'xl'}
                onChange={onChange('title')}
                value={displayTitle}
              />
            ) : (
              <Typography {...(!index && { variant: 'h4' })}>
                {displayTitle}
              </Typography>
            )}
            {length > 1 && <DsDeleteIconButton onClick={onDelete} />}
          </Stack>
          {selected ? (
            <DsStandardTextField
              onChange={onChange('description')}
              placeholder={placeholder}
              value={description}
            />
          ) : (
            <DsDescription hidden={!editable}>
              {description || placeholder}
            </DsDescription>
          )}
        </DsCard>
      </div>
      {children}
    </>
  );
}
