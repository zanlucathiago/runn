import { RadioGroup } from '@mui/material';

export default function MultipleChoice({ children, onChange, value }) {
  const handleChange = (e) => onChange(e.target.value);
  return (
    <RadioGroup onChange={handleChange} value={value}>
      {children}
    </RadioGroup>
  );
}
