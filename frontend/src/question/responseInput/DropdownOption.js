import { MenuItem } from '@mui/material';

export default function DropdownOption({ children, ...props }) {
  return <MenuItem {...props}>{children}</MenuItem>;
}
