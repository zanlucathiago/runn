import { CardActionArea } from '@mui/material';

export default function DsCardActionArea({ children, onClick, selected }) {
  return selected ? (
    children
  ) : (
    <CardActionArea disableRipple onClick={onClick}>
      {children}
    </CardActionArea>
  );
}
