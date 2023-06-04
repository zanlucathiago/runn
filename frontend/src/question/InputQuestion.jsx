import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Divider,
  FormControlLabel,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DsCol from '../components/DsCol';
import DsDeleteIconButton from '../components/DsDeleteIconButton';
import DsDescription from '../components/DsDescription';
import DsFilledTextField from '../components/DsFilledTextField';
import DsRow from '../components/DsRow';
import DsSelect from '../components/DsSelect';
import DsStandardTextField from '../components/DsStandardTextField';
import { TYPES } from '../constants/contants';
import icons from '../icons/icons';
import { getNewValidation } from '../services/sectionService';

function InputQuestion({
  children,
  selected,
  onChange,
  title,
  primaryKey,
  model,
  description,
  onClickDelete,
  editable,
  length,
}) {
  const [showDescription, setShowDescription] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    setShowDescription(Boolean(description));
  }, []);
  const handleChange = (event) => {
    onChange('primaryKey')({ target: { value: event.target.checked } });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickDescription = () => {
    handleClose();
    if (description && showDescription) {
      onChange('description')({ target: { value: null } });
    }
    setShowDescription(!showDescription);
  };
  const handleClickValidation = () => {
    handleClose();
    onChange('validations')({
      target: { value: length ? [] : [getNewValidation()] },
    });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return selected ? (
    <>
      <DsRow>
        <DsCol size={7}>
          <DsFilledTextField
            onChange={onChange('title')}
            placeholder="Pergunta"
            value={title}
          />
        </DsCol>
        <DsCol size={5}>
          <DsSelect onChange={onChange('model')} value={model}>
            {TYPES.reduce(
              (acc, cur, outerIndex) => [
                ...acc,
                ...cur.map((type, innerIndex) => ({
                  ...type,
                  outerIndex,
                  innerIndex,
                })),
              ],
              [],
            ).map(({ innerIndex, outerIndex }) => {
              const evaluatedValue = TYPES[outerIndex][innerIndex];
              const IconComponent = icons[evaluatedValue.icon];
              return [
                outerIndex && !innerIndex && <Divider />,
                <MenuItem value={evaluatedValue.value}>
                  <Stack direction="row" alignItems="center">
                    <ListItemIcon>
                      <IconComponent />
                    </ListItemIcon>
                    <ListItemText>{evaluatedValue.description}</ListItemText>
                  </Stack>
                </MenuItem>,
              ];
            })}
          </DsSelect>
        </DsCol>
      </DsRow>
      {showDescription && (
        <DsStandardTextField
          onChange={onChange('description')}
          placeholder="Descrição"
          value={description}
        />
      )}
      {children}
      <Divider variant="middle" />
      <Stack direction="row" justifyContent="flex-end">
        <DsDeleteIconButton onClick={onClickDelete} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <FormControlLabel
          control={(
            <Switch
              color="primary"
              checked={primaryKey}
              onChange={handleChange}
            />
          )}
          label="Chave primária"
          labelPlacement="start"
        />
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem disabled>Exibir</MenuItem>
          <MenuItem onClick={handleClickDescription}>
            <ListItemIcon>{showDescription && <CheckIcon />}</ListItemIcon>
            <ListItemText>Descrição</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClickValidation}>
            <ListItemIcon>{length ? <CheckIcon /> : null}</ListItemIcon>
            <ListItemText>Validação</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
    </>
  ) : (
    <>
      <Typography>{title || (editable && 'Pergunta')}</Typography>
      <DsDescription hidden={!description && (!editable || !showDescription)}>
        {description || 'Descrição'}
      </DsDescription>
      {children}
    </>
  );
}

InputQuestion.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  primaryKey: PropTypes.bool,
  model: PropTypes.string,
  description: PropTypes.string,
  onClickDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  length: PropTypes.number,
};

InputQuestion.defaultProps = {
  children: null,
  selected: false,
  title: null,
  primaryKey: false,
  model: null,
  description: null,
  editable: false,
  length: null,
};

export default InputQuestion;
