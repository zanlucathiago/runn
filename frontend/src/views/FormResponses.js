import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
    <DsContainer maxWidth="lg">
      <DsCircularProgress action={getDocumentList}>
        <DsTableContainer>
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
        </DsTableContainer>
      </DsCircularProgress>
    </DsContainer>
  );
}
