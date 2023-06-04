import {
  FormControl, MenuItem,
  Select,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function Dropdown({ children, onChange, value }) {
  const handleChange = (e) => onChange({ options: [e.target.value] });
  return (
    <FormControl size="small">
      <Select displayEmpty value={value.options[0] || ''} onChange={handleChange}>
        <MenuItem value="">
          <Typography color="rgba(0,0,0,.54)">Escolher</Typography>
        </MenuItem>
        {children}
      </Select>
    </FormControl>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

Dropdown.defaultProps = {
  children: null,
};

export default Dropdown;
