import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TaskType } from "./type";

function Task({id, value}: TaskType) {
  return (
    <ListItem key={id}>
      <ListItemIcon>
        <CheckCircleIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary={value} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Task;