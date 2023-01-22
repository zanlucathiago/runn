import { Typography } from '@mui/material';
import DsCard from '../components/DsCard';
import DsCol from '../components/DsCol';
import DsFilledTextField from '../components/DsFilledTextField';
import DsRow from '../components/DsRow';
import DsSelect from '../components/DsSelect';
import { TYPES } from '../contants';
import TypeCategory from './typeCategory/TypeCategory';

export default function Question({ onClick, question, selected }) {
  return (
    <DsCard onClick={onClick}>
      {selected ? (
        <DsRow>
          <DsCol size={6}>
            <DsFilledTextField placeholder="Pergunta" />
          </DsCol>
          <DsCol size={6}>
            <DsSelect>
              {TYPES.map((category, index) => (
                <TypeCategory index={index} />
              ))}
            </DsSelect>
          </DsCol>
        </DsRow>
      ) : (
        <Typography>asdasdasd</Typography>
      )}
    </DsCard>
  );
}
