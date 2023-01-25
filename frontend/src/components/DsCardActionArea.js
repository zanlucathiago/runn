import { CardActionArea } from '@mui/material';
import { useState } from 'react';

export default function DsCardActionArea({ children, onClick }) {
  const [cardRef, setCardRef] = useState(false);
  const setRef = (ref) => {
    if (!cardRef && ref) {
      setCardRef(true);
      onClick({ currentTarget: ref });
    }
  };
  return onClick ? (
    <CardActionArea disableRipple onClick={onClick} ref={setRef}>
      {children}
    </CardActionArea>
  ) : (
    children
  );
}
