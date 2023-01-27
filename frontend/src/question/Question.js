import Divider from '@mui/material/Divider';
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import DsCard from '../components/DsCard';
import DsCol from '../components/DsCol';
import DsDeleteIconButton from '../components/DsDeleteIconButton';
import DsFilledTextField from '../components/DsFilledTextField';
import DsRow from '../components/DsRow';
import DsSelect from '../components/DsSelect';
import DsStandardTextField from '../components/DsStandardTextField';
import { QUESTION_TYPE, SPACING, TYPES } from '../constants/contants';
import icons from '../icons/icons';

export default function Question({
  children,
  description,
  model,
  onChange,
  onClick,
  onClickDelete,
  selected = false,
  title,
  type,
}) {
  return (
    <DsCard selected={selected} onClick={onClick}>
      {type === QUESTION_TYPE.QUESTION.value ? (
        selected ? (
          <>
            <DsRow>
              <DsCol size={7}>
                <DsFilledTextField
                  onChange={onChange('title')}
                  placeholder="Pergunta"
                  value={title}
                />
              </DsCol>
              <DsCol size={5}>
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
                  ).map(({ innerIndex, outerIndex }) => {
                    const { value, description, icon } =
                      TYPES[outerIndex][innerIndex];
                    const IconComponent = icons[icon];
                    return [
                      outerIndex && !innerIndex && <Divider />,
                      <MenuItem value={value}>
                        <Stack direction="row" alignItems="center">
                          <ListItemIcon>
                            <IconComponent />
                          </ListItemIcon>
                          <ListItemText>{description}</ListItemText>
                        </Stack>
                      </MenuItem>,
                    ];
                  })}
                </DsSelect>
              </DsCol>
            </DsRow>
            {children}
            <Divider variant="middle" />
            <Stack alignItems="flex-end">
              <DsDeleteIconButton onClick={onClickDelete} />
            </Stack>
          </>
        ) : (
          <>
            <Typography>{title || 'Pergunta'}</Typography>
            {children}
          </>
        )
      ) : selected ? (
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
          <Box sx={{ color: '#70757a' }}>
            <Typography>{description || 'Descrição (opcional)'}</Typography>
          </Box>
          {children}
        </>
      )}
    </DsCard>
  );
}
