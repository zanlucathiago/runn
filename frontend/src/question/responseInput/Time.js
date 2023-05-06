import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeField } from '@mui/x-date-pickers/TimeField';
export default function Time({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimeField
        label="Format without meridiem"
        onChange={(time) => onChange({ text: time.format('HH:mm:ss') })}
        format="HH:mm"
      />
    </LocalizationProvider>
  );
}
