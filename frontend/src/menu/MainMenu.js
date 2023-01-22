import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, Paper, Popper } from '@mui/material';
import DsColumnStack from '../components/DsColumnStack';
import { QUESTION_TYPE } from '../constants/contants';
import DsTooltip from '../components/DsTooltip';

export default function MainMenu({ anchorEl, onAddQuestion, onAddSection }) {
  return (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="right">
      <Box sx={{ pl: 2 }}>
        <Paper>
          <DsColumnStack>
            <DsTooltip title="Adicionar pergunta">
              <IconButton onClick={onAddQuestion(QUESTION_TYPE.QUESTION.value)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </DsTooltip>
            <DsTooltip title="Adicionar título e descrição">
              <IconButton
                onClick={onAddQuestion(
                  QUESTION_TYPE.TITLE_AND_DESCRIPTION.value
                )}
              >
                <TextFieldsIcon />
              </IconButton>
            </DsTooltip>
            <DsTooltip title="Adicionar seção">
              <IconButton onClick={onAddSection}>
                <ViewAgendaOutlinedIcon />
              </IconButton>
            </DsTooltip>
          </DsColumnStack>
        </Paper>
      </Box>
    </Popper>
  );
}
