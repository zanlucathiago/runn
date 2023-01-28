import { DataGrid } from '@mui/x-data-grid';

export default function FormResponses() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={[]}
        columns={[]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
