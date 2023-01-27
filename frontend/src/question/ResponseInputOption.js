import { MODELS } from '../constants/contants';
import Components from './responseInput';

function humanize(str) {
  var i,
    frags = str.toLowerCase().split('_');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join('');
}

export default function ResponseInputOption({ children, model, ...props }) {
  const InputComponent = Components[`${humanize(MODELS[model].value)}Option`];
  return <InputComponent {...props}>{children}</InputComponent>;
}
