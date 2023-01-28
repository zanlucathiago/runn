import { Select, FormControl, MenuItem, Typography } from '@mui/material';

export default function Dropdown({ children, onChange, value }) {
  const handleChange = (e) => onChange({ options: [e.target.value] });
  return (
    <FormControl size="small">
      <Select displayEmpty value={value.options[0]} onChange={handleChange}>
        <MenuItem value="">
          <Typography color="rgba(0,0,0,.54)">Escolher</Typography>
        </MenuItem>
        {children}
      </Select>
    </FormControl>
  );
}
