import { Button } from '@mui/material';
import Validation from '../question/Validation';
import { getNewValidation } from '../services/sectionService';

export default function Validations({ onChange, validations }) {
  const handleChangeValidation = (idx) => (property) => (event) => {
    onChange(
      validations.map((validation, vIndex) =>
        vIndex === idx
          ? {
              ...validation,
              [property]: event.target.value,
            }
          : validation
      )
    );
  };
  const handleDeleteValidation = (idx) => () => {
    onChange(validations.filter((_validation, vIndex) => vIndex !== idx));
  };
  const onClickAddValidation = () => () => {
    onChange([...validations, getNewValidation()]);
  };
  return (
    <>
      {(validations || []).map((validation, idx) => (
        <Validation
          key={validation._id || validation.id}
          onChange={handleChangeValidation(idx)}
          onClickDelete={handleDeleteValidation(idx)}
          expression={validation.expression}
          operator={validation.operator}
        />
      ))}
      {validations?.length ? (
        <Button onClick={onClickAddValidation()}>Adicionar validação</Button>
      ) : null}
    </>
  );
}
