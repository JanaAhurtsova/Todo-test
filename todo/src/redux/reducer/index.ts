import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "@/components/todo/type";

interface InitialStateTypes {
  todos: TodoType[];
  filteredTodos: TodoType[];
}

const initialState: InitialStateTypes = {
  todos: [],
  filteredTodos: [],
};

export const ToDoSlice = createSlice({
  name: 'Todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoType>) {
      state.todos.push(action.payload);
    },

    removeTodo(state, action: PayloadAction<Pick<TodoType, 'id'| 'tags'>>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    editTodo(state, action: PayloadAction<TodoType>) {
      const todo = state.todos.find((item) => item.id === action.payload.id);
      todo!.tags = action.payload.tags;
      todo!.value = action.payload.value;
    },

    toggleTodoComplete(state, action: PayloadAction<Pick<TodoType, 'id'>>) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo!.completed = !toggledTodo!.completed;
    },

    filterByTags(state, action: PayloadAction<string[]>) {
      state.filteredTodos = [];
      state.todos.forEach((todo) => {
        action.payload.forEach((tag) => {
          if(todo.tags.includes(tag)) {
            state.filteredTodos.push(todo);
          }
        })
      })
    },
  },
});

export default ToDoSlice.reducer;
export const { addTodo, removeTodo, editTodo, toggleTodoComplete, filterByTags } = ToDoSlice.actions;