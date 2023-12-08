import { TodoType } from '@/components/todo/type';

export class Storage {
  public static getItem(key: string, defaultValue = []) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  }

  public static setTodo(key: string, value: TodoType) {
    const existItem = localStorage.getItem(key);
    if (existItem) {
      const data = JSON.parse(existItem);
      localStorage.setItem(key, JSON.stringify(data.concat(value)));
    } else {
      localStorage.setItem(key, JSON.stringify([value]));
    }
  }

  public static setTags(key: string, value: string[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static updateItem(key: string, value: TodoType) {
    const existItem = localStorage.getItem(key);
    if (existItem) {
      const data = JSON.parse(existItem) as TodoType[];
      const index = data.findIndex((item) => item.id === value.id);
      data[index] = value;
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  public static toggleItem(key: string, id: string) {
    const existItem = localStorage.getItem(key);
    if (existItem) {
      const data = JSON.parse(existItem) as TodoType[];
      const index = data.findIndex((item) => item.id === id);
      data[index].completed = !data[index].completed;
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  public static removeItem(key: string, key2: string, {id, tags}: Pick<TodoType, 'id' | 'tags'>) {
    const existItem = localStorage.getItem(key);
    if (existItem) {
      const data = JSON.parse(existItem) as TodoType[];
      const dataWithoutRemoveItem = data.filter((item) => item.id !== id);
      localStorage.setItem(key, JSON.stringify(dataWithoutRemoveItem));
    }

    const existsTags = localStorage.getItem(key2);
    if (existsTags) {
      const items = JSON.parse(existsTags) as string[];
      const tagsWithoutRemoveItem: string[] = [];
      items.forEach(item => {
        if(!tags.includes(item)) {
          tagsWithoutRemoveItem.push(item);
        }
      })
      localStorage.setItem(key2, JSON.stringify(tagsWithoutRemoveItem));
    }
  }

  public static clearAllItems() {
    localStorage.clear();
  }
};
