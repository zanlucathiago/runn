import { Select, FormControl, MenuItem, Typography } from '@mui/material';

export default function Dropdown({ children, onChange, value }) {
  const handleChange = (e) => onChange(e.target.value);
  return (
    <FormControl size="small">
      <Select displayEmpty value={value} onChange={handleChange}>
        <MenuItem value="">
          <Typography color="rgba(0,0,0,.54)">Escolher</Typography>
        </MenuItem>
        {children}
      </Select>
    </FormControl>
  );
}
