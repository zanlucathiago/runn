import { useNavigate } from 'react-router-dom';
import DsAppBar from '../components/DsAppBar';
import formService from '../features/formService';

export default function FormList() {
  const navigate = useNavigate();
  const createForm = () =>
    formService.createForm().then((data) => navigate(`/edit/${data}`));
  return <DsAppBar onClick={createForm} text="Novo" />;
}
