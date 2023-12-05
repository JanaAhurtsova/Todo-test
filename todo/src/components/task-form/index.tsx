import { Button, DialogActions, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { TaskFormType } from "./type";
import style from './style.module.scss';
import { useState } from "react";
import { ERROR_TASK } from "@/manager/errors";

function TaskForm({isOpen, setIsOpen}: TaskFormType) {
  const [value, setValue] = useState('');
  const [tags, setTag] = useState<string[]>([]);
  const [error, setError] = useState('');

  const onClose = () => setIsOpen(false);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setValue(e.target.value);
    setError('');
  };

  const createTask = () => {
    if (!value.trim()) {
      setError(ERROR_TASK);
    }

    const valueArr = value.split(/(#[a-z\d-]+)/gi);
    const valueWithHash = valueArr.find((el) => el.startsWith('#'));

    if (valueWithHash) {
      setTag((prev) => prev.concat(valueWithHash.replace('#', '')));
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

export default TaskForm;