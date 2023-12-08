import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "@/components/todo/type";
import { Storage } from "@/manager/storage";

interface InitialStateTypes {
  todos: TodoType[];
  tags: string[]
}

const initialState: InitialStateTypes = {
  todos: Storage.getItem('todo'),
  tags: Storage.getItem('tags')
};

export const ToDoSlice = createSlice({
  name: 'Todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoType>) {
      state.todos.push(action.payload);
    },

    removeTodo(state, action: PayloadAction<Pick<TodoType, 'id' | 'tags'>>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    editTodo(state, action: PayloadAction<TodoType>) {
      const todo = state.todos.find((item) => item.id === action.payload.id);
      todo!.tags = action.payload.tags;
      todo!.value = action.payload.value;
    },

    toggleTodoComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      toggledTodo!.completed = !toggledTodo!.completed;
    },

    addTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    }
  },
});

export default ToDoSlice.reducer;
export const { addTodo, removeTodo, editTodo, toggleTodoComplete, addTags } = ToDoSlice.actions;