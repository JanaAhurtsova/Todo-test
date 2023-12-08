import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { Storage } from "@/manager/storage";
import { AppDispatch, RootState } from "../store";
import { TodoType } from '../../components/todo/type';
import { addTags, addTodo, editTodo, removeTodo, toggleTodoComplete } from "../reducer";

const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTodoEvent = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (todo: TodoType) => {
      Storage.setTodo('todo', todo);
      dispatch(addTodo(todo));
    },
    [dispatch]
  );
};

export const useTodoToggle = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (id: string) => {
      dispatch(toggleTodoComplete(id));
      Storage.toggleItem('todo', id);
    },
    [dispatch]
  );
}

export const useTodoRemove = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    ({ id, tags }: Pick<TodoType, 'id' |'tags'>) => {
      dispatch(removeTodo({id, tags}));
      Storage.removeItem('todo', 'tags', {id, tags});
    },
    [dispatch]
  );
}

export const useTodoEdit = () => {
  const dispatch = useAppDispatch();
  return useCallback((todo: TodoType) => {
    Storage.updateItem('todo', todo);
    dispatch(editTodo(todo));
  }, [dispatch])
}

export const useAddTags = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (tags: string[]) => {
      dispatch(addTags(tags));
    },
    [dispatch]
  );
}