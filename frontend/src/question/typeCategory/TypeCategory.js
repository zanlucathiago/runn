import { Divider, MenuItem } from '@mui/material';
import { TYPES } from '../../constants/contants';

export default function TypeCategory({ index }) {
  return [
    Boolean(index) && <Divider />,
    TYPES[index].map((type) => (
      <MenuItem value={type.value}>{type.description}</MenuItem>
    )),
  ];
}
