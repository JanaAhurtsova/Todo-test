import { useEffect, useState } from 'react';
import { Container, List } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { filterTodos } from '@/manager/tags';
import Todo from '../todo';
import { TodoType } from '../todo/type';

function TodosList() {
  const todos = useAppSelector((state) => state.todos);
  const tags = useAppSelector((state) => state.tags);
  const [todosForRender, setTodosForRender] = useState<TodoType[]>(todos);
  
  useEffect(() => {
    const filteredTodos = filterTodos(todos, tags);
    const allTodos = filteredTodos.length > 0 ? filteredTodos: todos;
    setTodosForRender(allTodos);
  }, [tags, todos]);

  return (
    <Container maxWidth="md">
      <List>
        {todosForRender.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </List>
    </Container>
  );
}

export default TodosList;
