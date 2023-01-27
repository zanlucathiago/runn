import { CardActionArea } from '@mui/material';

export default function DsCardActionArea({ children, onClick, clickable }) {
  return clickable ? (
    <CardActionArea disableRipple onClick={onClick}>
      {children}
    </CardActionArea>
  ) : (
    children
  );
}
