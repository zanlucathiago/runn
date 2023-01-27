import { Select, FormControl } from '@mui/material';

export default function Dropdown({ children, onChange, value }) {
  return (
    <FormControl size="small">
      <Select value={value} onChange={onChange}>
        {children}
      </Select>
    </FormControl>
  );
}
