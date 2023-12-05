import { useState } from "react";
import Controls from "./components/controls";
import Header from "./components/header";
import TaskForm from "./components/task-form";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header/>
      <Controls setIsOpen={setIsOpen} />
      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default App
