import icons from '../icons/icons';
import DsSelect from '../components/DsSelect';
import DsCol from '../components/DsCol';
import DsRow from '../components/DsRow';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import DsFilledTextField from '../components/DsFilledTextField';
import DsStandardTextField from '../components/DsStandardTextField';
import DsDescription from '../components/DsDescription';
import DsDeleteIconButton from '../components/DsDeleteIconButton';
import { TYPES } from '../constants/contants';
import { useEffect, useState } from 'react';

export default function InputQuestion({
  children,
  selected,
  onChange,
  title,
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
    console.log(
      '🚀 ~ file: Question.js:43 ~ useEffect ~ description:',
      description
    );
    setShowDescription(Boolean(description));
  }, []);
  const handleClickDescription = () => {
    handleClose();
    if (description && showDescription) {
      onChange('description')({ target: { value: null } });
    }
    setShowDescription(!showDescription);
  };
  const handleClickValidation = () => {
    handleClose();
    onChange('validations')({ target: { value: length ? [] : ['   '] } });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              []
            ).map(({ innerIndex, outerIndex }) => {
              const { value, description, icon } =
                TYPES[outerIndex][innerIndex];
              const IconComponent = icons[icon];
              return [
                outerIndex && !innerIndex && <Divider />,
                <MenuItem value={value}>
                  <Stack direction="row" alignItems="center">
                    <ListItemIcon>
                      <IconComponent />
                    </ListItemIcon>
                    <ListItemText>{description}</ListItemText>
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
      <Typography>{title || 'Pergunta'}</Typography>
      <DsDescription hidden={!description && (!editable || !showDescription)}>
        {description || 'Descrição'}
      </DsDescription>
      {children}
    </>
  );
}
