import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useTodoEdit, useTodoRemove, useTodoToggle } from '@/redux/hooks';
import { getTags, getUniqueTags } from '@/manager/tags';
import { TodoType } from './type';
import style from './style.module.scss';

function Todo({ id, completed, value, tags }: TodoType) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTags, setNewTags] = useState(tags);
  const [newValue, setNewValue] = useState(value);
  const toggle = useTodoToggle();
  const remove = useTodoRemove();
  const edit = useTodoEdit();

  useEffect(() => {
    const valueWithHash = getTags(newValue);
    setNewTags(getUniqueTags(valueWithHash));
  }, [newValue])

  const onSave = () => {
    setIsEdit(false);
    const updatedTodo = { id, value: newValue, tags: newTags, completed };
    edit(updatedTodo);
  };
  return (
    <ListItem key={id} divider>
      <Checkbox checked={completed} onChange={() => toggle({ id })} />
      {isEdit ? (
        <Box className={style.box}>
          <TextField
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            autoFocus
            className={style.edit}
          />
            <Stack direction="row" spacing={1}>
              {newTags.map((tag) => (
                <Chip
                  key={uuidv4()}
                  label={tag}
                  color="success"
                  variant="outlined"
                  className={style.tag}
                />
              ))}
            </Stack>
        </Box>
      ) : (
        <Box className={style.box}>
          <ListItemText className={style.edited} primary={newValue} />
            <Stack direction="row" spacing={1}>
              {newTags.map((tag) => (
                <Chip
                  key={uuidv4()}
                  label={tag}
                  color="success"
                  variant="outlined"
                  className={style.tag}
                />
              ))}
            </Stack>
        </Box>
      )}

      <ListItemSecondaryAction className={style.actions}>
        {isEdit ? (
          <IconButton edge="end" aria-label="save" onClick={onSave}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton edge="end" aria-label="edit" onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => remove({ id, tags })}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
