import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, Paper, Popper } from '@mui/material';
import DsColumnStack from '../components/DsColumnStack';
import { QUESTION_TYPE } from '../constants/contants';

export default function MainMenu({ anchorEl, onAddQuestion, onAddSection }) {
  return (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="right">
      <Box sx={{ pl: 2 }}>
        <Paper>
          <DsColumnStack>
            <IconButton onClick={onAddQuestion(QUESTION_TYPE.QUESTION.value)}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              onClick={onAddQuestion(QUESTION_TYPE.TITLE_AND_DESCRIPTION.value)}
            >
              <TextFieldsIcon />
            </IconButton>
            <IconButton onClick={onAddSection}>
              <ViewAgendaOutlinedIcon />
            </IconButton>
          </DsColumnStack>
        </Paper>
      </Box>
    </Popper>
  );
}
