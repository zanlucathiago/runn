import { Card } from '@mui/material';
import { useRef } from 'react';
import DsBox from './DsBox';
import DsCardActionArea from './DsCardActionArea';
import DsStack from './DsStack';

export default function DsCard({ children, onClick, selected }) {
  const first = useRef();
  const handleClick = () =>
    onClick && onClick({ currentTarget: first.current });
  return (
    <Card ref={first}>
      <DsCardActionArea onClick={handleClick} selected={selected}>
        <DsBox>
          <DsStack>{children}</DsStack>
        </DsBox>
      </DsCardActionArea>
    </Card>
  );
}
