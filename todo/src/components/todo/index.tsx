import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useTodoEdit, useTodoRemove, useTodoToggle } from '@/redux/hooks';
import { getTags, getUniqueTags } from '@/manager/tags';
import { TodoType } from './type';
import style from './style.module.scss';
import Tags from '../tags';

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
            <Tags tags={newTags} />
        </Box>
      ) : (
        <Box className={style.box}>
          <ListItemText className={style.edited} primary={newValue} />
            <Tags tags={newTags} />
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
