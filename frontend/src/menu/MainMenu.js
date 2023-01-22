import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, Paper, Popper, Stack } from '@mui/material';

export default function MainMenu({ anchorEl, onAddQuestion, onAddSection }) {
  return (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="right">
      <Box sx={{ pl: 2 }}>
        <Paper>
          <Stack direction="column">
            <IconButton>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton>
              <TextFieldsIcon onClick={onAddQuestion} />
            </IconButton>
            <IconButton onClick={onAddSection}>
              <ViewAgendaOutlinedIcon />
            </IconButton>
          </Stack>
        </Paper>
      </Box>
    </Popper>
  );
}
