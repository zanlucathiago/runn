import { TextField } from '@mui/material';

const FONT_SIZE = {
  xs: 8,
  sm: 11,
  md: 16,
  lg: 23,
  xl: 32,
};

export default function DsTextField({ children, fontSize, ...props }) {
  return (
    <TextField
      fullWidth
      {...props}
      {...(fontSize
        ? {
            inputProps: {
              style: { fontSize: FONT_SIZE[fontSize] },
            },
          }
        : {})}
    >
      {children}
    </TextField>
  );
}
