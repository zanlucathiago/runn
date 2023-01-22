import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, IconButton, Paper, Popper, Stack } from '@mui/material';

export default function MainMenu({ anchorEl, onAddSection }) {
  return (
    <Popper open={!!anchorEl} anchorEl={anchorEl} placement="right">
      <Box sx={{ pl: 2 }}>
        <Paper>
          <Stack direction="column">
            <IconButton>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton>
              <TextFieldsIcon />
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
