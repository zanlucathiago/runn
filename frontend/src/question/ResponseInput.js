import Components from '../components';
import { MODELS } from '../constants/contants';

export default function ResponseInput({ model }) {
  const InputComponent = Components[MODELS[model].component];
  return <InputComponent size="small" variant="standard" />;
}
