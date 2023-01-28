import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DsAppBar from '../components/DsAppBar';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import DsTableContainer from '../components/DsTableContainer';
import formResource from '../features/formResource';

export default function FormList() {
  const [formList, setFormList] = useState([]);
  const getFormList = () => formResource.getFormList().then(setFormList);
  const navigate = useNavigate();
  const editForm = (id) => navigate(`/d/${id}/edit`);
  const onClickRow = (id) => () => editForm(id);
  const createForm = () => formResource.createForm().then(editForm);
  return (
    <>
      <DsAppBar onClick={createForm} text="Novo" />
      <DsContainer>
        <DsTableContainer>
          <DsCircularProgress action={getFormList}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Criado em</TableCell>
                  <TableCell>Modificado em</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formList.map((row) => (
                  <TableRow
                    key={row._id}
                    onClick={onClickRow(row._id)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.updatedAt}</TableCell>
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
