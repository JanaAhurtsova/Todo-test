import { useState } from "react";
import { Button } from "@mui/material";
import Header from "./components/header";
import TaskForm from "./components/todo-form";
import TodosList from "./components/list";
import Filter from "./components/filter";

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

export default App
