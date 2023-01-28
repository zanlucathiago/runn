import Components from './responseInput';
import { MODELS } from '../constants/contants';
import { useState } from 'react';

function humanize(str) {
  var i,
    frags = str.toLowerCase().split('_');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join('');
}

export default function ResponseInput({ children, model, onChange }) {
  const [value, setValue] = useState({ text: null, options: [] });
  const handleChange = (newValue) => {
    const toUpdate = { ...value, ...newValue };
    setValue(toUpdate);
    onChange(toUpdate);
  };
  const InputComponent = Components[humanize(MODELS[model].value)];
  return (
    <InputComponent onChange={handleChange} value={value}>
      {children}
    </InputComponent>
  );
}
