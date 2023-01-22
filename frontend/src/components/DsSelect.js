import { Select } from '@mui/material';

export default function DsSelect({ children, ...props }) {
  return (
    <Select fullWidth {...props}>
      {children}
    </Select>
  );
}
