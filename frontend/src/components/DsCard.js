import { Card, CardActionArea } from '@mui/material';
import { useState } from 'react';
import DsBox from './DsBox';
import DsStack from './DsStack';

export default function DsCard({ children, onClick }) {
  const [cardRef, setCardRef] = useState(false);
  const setRef = (ref) => {
    if (!cardRef && ref) {
      setCardRef(true);
      onClick({ currentTarget: ref });
    }
  };
  return (
    <Card>
      <CardActionArea disableRipple onClick={onClick} ref={setRef}>
        <DsBox>
          <DsStack>{children}</DsStack>
        </DsBox>
      </CardActionArea>
    </Card>
  );
}
