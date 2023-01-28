import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DsAppBar from '../components/DsAppBar';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import documentResource from '../features/documentResource';

export default function FormResponses() {
  const [documents, setDocuments] = useState({});
  const { id } = useParams();
  const getDocumentList = () =>
    documentResource.getDocumentList(id).then(setDocuments);
  return (
    <>
      <DsAppBar onClick={() => {}} text="Salvar">
        <IconButton href={`/d/e/${id}/view`}>
          <RemoveRedEyeOutlinedIcon sx={{ color: '#FFF' }} />
        </IconButton>
      </DsAppBar>
      <DsContainer maxWidth="lg">
        <DsCircularProgress action={getDocumentList}>
          <div style={{ height: 400 }}>
            <DataGrid rows={documents.rows} columns={documents.columns} />
          </div>
        </DsCircularProgress>
      </DsContainer>
    </>
  );
}
