import { useState } from 'react';
import { Button } from '@mui/material';
import Header from '../header';
import TaskForm from '../todo-form';
import TodosList from '../list';
import Filter from '../filter';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Header />
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        + Add Task
      </Button>
      <Filter />
      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <TodosList />
    </>
  );
}

export default App;
