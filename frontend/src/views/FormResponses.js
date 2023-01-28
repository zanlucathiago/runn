import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DsAppBar from '../components/DsAppBar';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import DsTableContainer from '../components/DsTableContainer';
import documentResource from '../features/documentResource';

export default function FormResponses() {
  const [documents, setDocuments] = useState({ questions: [], responses: [] });
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
        <DsTableContainer>
          <DsCircularProgress action={getDocumentList}>
            <Table>
              <TableHead>
                <TableRow>
                  {documents.questions.map((question) => (
                    <TableCell key={question._id}>{question.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.responses.map((response) => (
                  <TableRow key={response._id}>
                    {documents.questions.map((question) => (
                      <TableCell key={question._id}>
                        {response[question._id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DsCircularProgress>
        </DsTableContainer>
      </DsContainer>
    </>
  );
}
