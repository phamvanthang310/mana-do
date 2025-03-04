import { IAPI } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk';
const LocalStorageKey = 'todos';

class ApiFrontend extends IAPI {
  async signIn(username: string, password: string): Promise<string> {
    if (username === 'firstUser' && password === 'example') {
      return Promise.resolve(mockToken);
    }

    return Promise.reject('Incorrect username/password');
  }

  async createTodo(content: string): Promise<Todo> {
    return Promise.resolve({
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
    } as Todo);
  }

  async getTodos(): Promise<Todo[]> {
    return JSON.parse(localStorage.getItem(LocalStorageKey) || '[]');
  }

  // persist to local storage
  persistToDo(todos: Todo[]): void {
    localStorage.setItem(LocalStorageKey, JSON.stringify(todos));
  }
}

export default new ApiFrontend();
