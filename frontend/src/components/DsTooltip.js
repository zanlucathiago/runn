import { Tooltip } from '@mui/material';

export default function DsTooltip({ children, ...props }) {
  return (
    <Tooltip placement="right" {...props}>
      {children}
    </Tooltip>
  );
}
