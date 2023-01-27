import moment from 'moment';
import 'moment/locale/pt-br';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
export default function Date({ onChange, value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
      <DatePicker
        value={value}
        onChange={(newValue) => onChange(moment(newValue).format('YYYY-MM-DD'))}
        renderInput={(params) => (
          <TextField {...params} size="small" variant="standard" />
        )}
      />
    </LocalizationProvider>
  );
}
