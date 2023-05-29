import moment from 'moment';
import 'moment/locale/pt-br';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function Date({ onChange, value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
      <DatePicker
        value={value.text ? moment(value.text) : null}
        onChange={(newValue) => {
          console.log('🚀 ~ file: Date.js:31 ~ Date ~ newValue:', newValue);
          return onChange({
            text: newValue ? moment(newValue).format('YYYY-MM-DD') : null,
          });
        }}
      />
    </LocalizationProvider>
  );
}
