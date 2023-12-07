import { Button, DialogActions, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { ERROR_TASK } from "@/manager/errors";
import { useTodoEvent } from "@/redux/hooks";
import { getTags } from "@/manager/tags";
import style from './style.module.scss';
import { TodoFormType } from "./type";

function TodoForm({isOpen, setIsOpen }: TodoFormType) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const addTodo = useTodoEvent();

  const onClose = () => {
    setIsOpen(false);
    setError('');
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setValue(e.target.value);
    setError('');
  };

  const createTask = () => {
    if (!value.trim()) {
      setError(ERROR_TASK);
    } else {
      const valueWithHash = getTags(value);
      
      addTodo({ id: uuidv4(), value, tags: valueWithHash, completed: false });
      setValue('');
      onClose();
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="task"
          placeholder="Enter Your ToDo"
          type="text"
          multiline
          maxRows={6}
          variant="standard"
          className={style.modal}
          onChange={changeValue}
        />
        <div className={style.error__container}>
          {error && <Typography className={style.error}>{error}</Typography>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={createTask}>Save</Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodoForm;