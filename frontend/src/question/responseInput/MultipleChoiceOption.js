import { FormControlLabel, Radio } from '@mui/material';

export default function MultipleChoiceOption({ children, value }) {
  return (
    <FormControlLabel value={value} control={<Radio />} label={children} />
  );
}
