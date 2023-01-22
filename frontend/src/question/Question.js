import { Typography } from '@mui/material';
import DsCard from '../components/DsCard';
import DsCol from '../components/DsCol';
import DsFilledTextField from '../components/DsFilledTextField';
import DsRow from '../components/DsRow';
import DsSelect from '../components/DsSelect';
import { TYPES } from '../contants';
import TypeCategory from './typeCategory/TypeCategory';

export default function Question({
  description,
  onChange,
  onClick,
  selected,
  title,
}) {
  return (
    <DsCard onClick={onClick}>
      {selected ? (
        <DsRow>
          <DsCol size={6}>
            <DsFilledTextField
              onChange={onChange('title')}
              placeholder="Pergunta"
              value={title}
            />
          </DsCol>
          <DsCol size={6}>
            <DsSelect>
              {TYPES.map((_category, index) => (
                <TypeCategory index={index} />
              ))}
            </DsSelect>
          </DsCol>
        </DsRow>
      ) : (
        <Typography>{title}</Typography>
      )}
    </DsCard>
  );
}
