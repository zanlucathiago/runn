import { useState } from 'react';
import { useParams } from 'react-router-dom';
import validationResource from '../features/validationResource';
import DsCircularProgress from '../components/DsCircularProgress';
import DsContainer from '../components/DsContainer';
import Validations from './Validations';

export default function FormValidations() {
  const [validations, setValidations] = useState([]);
  const { id } = useParams();
  const getValidationList = () =>
    validationResource.getValidationList(id).then(setValidations);
  return (
    <DsContainer maxWidth="lg">
      <DsCircularProgress action={getValidationList}>
        <Validations validations={validations} />
      </DsCircularProgress>
    </DsContainer>
  );
}
