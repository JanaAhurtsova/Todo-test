import { Container, List } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import Todo from '../todo';

function TodosList() {
  const todos = useAppSelector((state) => state.todos);
  const filteredTodos = useAppSelector((state) => state.filteredTodos);
  const todosforRender = filteredTodos.length > 0 ? filteredTodos : todos

  return (
    <Container maxWidth="md">
      <List>
        {todosforRender.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </List>
    </Container>
  );
}

export default TodosList;
