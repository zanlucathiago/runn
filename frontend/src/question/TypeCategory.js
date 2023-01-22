import { Divider, MenuItem } from '@mui/material';
import { TYPES } from '../contants';

export default function TypeCategory({ index }) {
  return [
    !!index && <Divider />,
    TYPES[index].map((type) => (
      <MenuItem value={type.value}>{type.description}</MenuItem>
    )),
  ];
}
