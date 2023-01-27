import { RadioGroup } from '@mui/material';

export default function MultipleChoice({ children, onChange, value }) {
  return (
    <RadioGroup onChange={onChange} value={value}>
      {children}
    </RadioGroup>
  );
}
