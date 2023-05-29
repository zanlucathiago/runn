import Components from './responseInput';
import { MODELS } from '../constants/contants';

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

function convertSnakeCaseToCamelCase(str) {
  const words = str.toLowerCase().split('_');
  const capitalizedWords = words.map(capitalizeFirstLetter);
  return capitalizedWords.join('');
}

export default function ResponseInput({
  children,
  model,
  onChange,
  validations,
  value = { text: null, options: [] },
}) {
  const handleChange = (newValue) => {
    const toUpdate = { ...value, ...newValue };
    onChange(toUpdate);
  };
  const InputComponent =
    Components[convertSnakeCaseToCamelCase(MODELS[model].value)];
  return (
    <InputComponent
      onChange={handleChange}
      validations={validations}
      value={value}
    >
      {children}
    </InputComponent>
  );
}
