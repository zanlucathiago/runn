import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import 'moment/locale/pt-br';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import validationResource from '../../features/validationResource';

function Date({ questionId, onChange, value }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const onGetValidation = (data) => {
    setLoading(false);
    setOptions(data);
  };
  useEffect(() => {
    if (questionId) {
      setLoading(true);
      validationResource.getValidationList(questionId).then(onGetValidation);
    }
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
      <DateCalendar
        loading={loading}
        shouldDisableDate={(date) => options[date.format('YYYY-MM-DD')]}
        value={value.text ? moment(value.text) : null}
        onChange={(newValue) => onChange({
          text: newValue ? moment(newValue).format('YYYY-MM-DD') : null,
        })}
        views={['day']}
      />
    </LocalizationProvider>
  );
}

Date.propTypes = {
  onChange: PropTypes.func.isRequired,
  questionId: PropTypes.string,
  value: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
};

Date.defaultProps = {
  questionId: null,
};

export default Date;
