import { Paper, TableContainer } from '@mui/material';

export default function DsTableContainer({ children }) {
  return <TableContainer component={Paper}>{children}</TableContainer>;
}
