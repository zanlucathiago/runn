import { RadioGroup } from '@mui/material';

export default function MultipleChoice({ children, onChange, value }) {
  const handleChange = (e) => onChange({ options: [e.target.value] });
  return (
    <RadioGroup onChange={handleChange} value={value.options[0]}>
      {children}
    </RadioGroup>
  );
}
