import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import 'moment/locale/pt-br';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import validationResource from '../../features/validationResource';

const createUrlParamsWithDate = (formattedDate) => {
  const params = new URLSearchParams();
  params.set('date', formattedDate);
  return params;
};

function Date({
  questionId, onChange, validations, value,
}) {
  const [searchParams] = useSearchParams();
  const [activeMonth, setActiveMonth] = useState(moment(searchParams.get(`entry.${questionId}`) || undefined).format('YYYY-MM'));
  const [options, setOptions] = useState({});
  const onGetValidation = (key) => (data) => {
    setOptions({
      ...options,
      [key]: {
        options: data,
      },
    });
  };
  const setActiveMonthAndReturnFormattedDate = (date) => {
    const formattedDate = date.format('YYYY-MM');
    setActiveMonth(formattedDate);
    return formattedDate;
  };
  const updateOptionsAndFetchValidation = (date, params) => {
    setOptions({
      ...options,
      [date]: {},
    });
    validationResource.getValidationList(questionId, params)
      .then(onGetValidation(date));
  };
  const handleFormattedDate = (date) => {
    const params = createUrlParamsWithDate(date);
    updateOptionsAndFetchValidation(date, params);
  };
  const isAvailableOptionsValidationExists = () => validations.some((validation) => validation.expression === 'AVAILABLE_OPTIONS'
  && validation.operator === 'EXISTS');
  useEffect(() => {
    if (questionId && isAvailableOptionsValidationExists()) {
      handleFormattedDate(activeMonth);
    }
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
      <DateCalendar
        loading={options[activeMonth] && !options[activeMonth].options}
        onMonthChange={(month) => {
          const formattedMonth = setActiveMonthAndReturnFormattedDate(month);
          if (!options[formattedMonth] && isAvailableOptionsValidationExists()) {
            handleFormattedDate(formattedMonth);
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
