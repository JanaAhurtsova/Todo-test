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