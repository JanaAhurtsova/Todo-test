import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { AppDispatch, RootState } from "../store";
import { TodoType } from '../../components/todo/type';
import { addTodo, editTodo, filterByTags, removeTodo, toggleTodoComplete } from "../reducer";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTodoEvent = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (todo: TodoType) => {
      dispatch(addTodo(todo));
    },
    [dispatch]
  );
};

export const useTodoToggle = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (id: Pick<TodoType, 'id'>) => {
      dispatch(toggleTodoComplete(id));
    },
    [dispatch]
  );
}

export const useTodoRemove = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    ({ id, tags }: Pick<TodoType, 'id' | 'tags'>) => {
      dispatch(removeTodo({id, tags}));
    },
    [dispatch]
  );
}

export const useTodoEdit = () => {
  const dispatch = useAppDispatch();
  return useCallback((todo: TodoType) => {
    dispatch(editTodo(todo));
  }, [dispatch])
}

export const useFilterByTags = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (tags: string[]) => {
      dispatch(filterByTags(tags));
    },
    [dispatch]
  );
}