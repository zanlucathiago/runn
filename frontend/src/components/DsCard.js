import { Card } from '@mui/material';
import DsBox from './DsBox';
import DsCardActionArea from './DsCardActionArea';
import DsStack from './DsStack';

export default function DsCard({ children, onClick }) {
  return (
    <Card>
      <DsCardActionArea onClick={onClick}>
        <DsBox>
          <DsStack>{children}</DsStack>
        </DsBox>
      </DsCardActionArea>
    </Card>
  );
}
