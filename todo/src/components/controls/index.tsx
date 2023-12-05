import { ControlsType } from "./type";
import Button from '@mui/material/Button';

function Controls({ setIsOpen }: ControlsType) {
  return (
    <Button variant="contained" onClick={() => setIsOpen(true)}>+ Add Task</Button>
  )
}

export default Controls;