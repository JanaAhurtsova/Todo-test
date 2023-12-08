import { TodoType } from "@/components/todo/type";

export const getTags = (value: string) => {
  const valueArr = value.split(/(#[a-z\d-]+)/gi);
  return valueArr.filter((el) => el.startsWith('#'));
}

export const getUniqueTags = (tags: string[]) => Array.from(new Set(tags))

export const getExistTags = (state: TodoType[]) => {
  const tags: string[] = [];
  state.forEach(item => {
    tags.push(...item.tags)
  })

  return getUniqueTags(tags);
}

export const filterTodos = (todos: TodoType[], tags: string[]) => {
  const filteredTodos: TodoType[] = [];
  todos.forEach((todo) => {
    tags.forEach((tag) => {
      if (todo.tags.includes(tag)) {
        filteredTodos.push(todo);
      }
    });
  });
  return filteredTodos;
};