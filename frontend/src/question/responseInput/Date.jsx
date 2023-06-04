import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import 'moment/locale/pt-br';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import validationResource from '../../features/validationResource';

function Date({ questionId, onChange, value }) {
  const [searchParams] = useSearchParams();
  const [activeMonth, setActiveMonth] = useState();
  const [options, setOptions] = useState({});
  const onGetValidation = (key) => (data) => {
    setOptions({
      ...options,
      [key]: {
        options: data,
      },
    });
  };
  useEffect(() => {
    if (questionId) {
      const params = new URLSearchParams();
      const formattedDate = moment(searchParams.get(`entry.${questionId}`)).format('YYYY-MM');
      setActiveMonth(formattedDate);
      params.set('date', formattedDate);
      setOptions({
        [formattedDate]: {},
      });
      validationResource.getValidationList(questionId, params).then(onGetValidation(formattedDate));
    }
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
      <DateCalendar
        loading={options[activeMonth] && !options[activeMonth].options}
        onMonthChange={(month) => {
          const formattedMonth = month.format('YYYY-MM');
          setActiveMonth(formattedMonth);
          if (!options[formattedMonth] && questionId) {
            const params = new URLSearchParams();
            params.set('date', formattedMonth);
            setOptions({
              ...options,
              [formattedMonth]: {},
            });
            validationResource.getValidationList(questionId, params)
              .then(onGetValidation(formattedMonth));
          }
        }}
        shouldDisableDate={(date) => options[date.format('YYYY-MM')]?.options?.[date.format('DD')]}
        defaultValue={value.text ? moment(value.text) : null}
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
