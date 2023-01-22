import { Box, MenuItem, Typography } from '@mui/material';
import DsCard from '../components/DsCard';
import DsCol from '../components/DsCol';
import DsFilledTextField from '../components/DsFilledTextField';
import DsRow from '../components/DsRow';
import DsSelect from '../components/DsSelect';
import DsStandardTextField from '../components/DsStandardTextField';
import { QUESTION_TYPE, TYPES } from '../constants/contants';

export default function Question({
  description,
  model,
  onChange,
  onClick,
  selected,
  title,
  type,
}) {
  return (
    <DsCard onClick={!selected && onClick}>
      {type === QUESTION_TYPE.QUESTION.value ? (
        selected ? (
          <DsRow>
            <DsCol size={6}>
              <DsFilledTextField
                onChange={onChange('title')}
                placeholder="Pergunta"
                value={title}
              />
            </DsCol>
            <DsCol size={6}>
              <DsSelect onChange={onChange('model')} value={model}>
                {TYPES.reduce(
                  (acc, cur, outerIndex) => [
                    ...acc,
                    ...cur.map((type, innerIndex) => ({
                      ...type,
                      outerIndex,
                      innerIndex,
                    })),
                  ],
                  []
                ).map(({ innerIndex, outerIndex }) => (
                  <MenuItem value={TYPES[outerIndex][innerIndex].value}>
                    {TYPES[outerIndex][innerIndex].description}
                  </MenuItem>
                ))}
              </DsSelect>
            </DsCol>
          </DsRow>
        ) : (
          <Typography>{title}</Typography>
        )
      ) : selected ? (
        [
          <DsFilledTextField
            onChange={onChange('title')}
            placeholder="Título"
            value={title}
          />,
          <DsStandardTextField
            onChange={onChange('description')}
            placeholder="Descrição (opcional)"
            value={description}
          />,
        ]
      ) : (
        [
          <Typography>{title || 'Título'}</Typography>,
          <Box sx={{ color: '#70757a' }}>
            <Typography>{description || 'Descrição (opcional)'}</Typography>
          </Box>,
        ]
      )}
    </DsCard>
  );
}
