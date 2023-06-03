import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Validation from '../question/Validation';
import { getNewValidation } from '../services/sectionService';

function Validations({ onChange, validations }) {
  const handleChangeValidation = (idx) => (property) => (event) => {
    onChange(
      validations.map((validation, vIndex) => (vIndex === idx
        ? {
          ...validation,
          [property]: event.target.value,
        }
        : validation)),
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

Validations.propTypes = {
  onChange: PropTypes.func.isRequired,
  validations: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
      expression: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
      expression: PropTypes.string.isRequired,
    }),
  ])).isRequired,
};

export default Validations;
