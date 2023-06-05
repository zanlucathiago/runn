import PropTypes from 'prop-types';
import React from 'react';
import { MODELS } from '../constants/contants';
import Components from './responseInput';

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function convertSnakeCaseToCamelCase(str) {
  const words = str.toLowerCase().split('_');
  const capitalizedWords = words.map(capitalizeFirstLetter);
  return capitalizedWords.join('');
}

function ResponseInput({
  children,
  model,
  onChange,
  questionId,
  validations,
  value,
}) {
  const handleChange = (newValue) => {
    const toUpdate = { ...value, ...newValue };
    onChange(toUpdate);
  };
  const InputComponent = Components[convertSnakeCaseToCamelCase(MODELS[model].value)];
  return (
    <InputComponent
      onChange={handleChange}
      questionId={questionId}
      validations={validations}
      value={value}
    >
      {children}
    </InputComponent>
  );
}

ResponseInput.propTypes = {
  children: PropTypes.node,
  model: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  questionId: PropTypes.string,
  value: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
  }),
};

ResponseInput.defaultProps = {
  children: null,
  questionId: null,
  value: { text: null, options: [] },
};

export default ResponseInput;
