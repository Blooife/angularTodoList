import { Injectable } from '@angular/core';
import {TaskItem} from '../models/TaskItem';

const STORAGE_KEY = 'task_items';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  constructor() { }

  getAllTasks(): TaskItem[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addTask(content: string): TaskItem {
    const todos = this.getAllTasks();
    const newTodo: TaskItem = {
      id: Date.now(),
      content: content,
      completed: false
    };
    todos.push(newTodo);
    this.saveTasks(todos);

    return newTodo;
  }

  deleteTasksByIds(ids: number[]): void {
    const tasks = this.getAllTasks().filter(todo => !ids.includes(todo.id));
    this.saveTasks(tasks);
  }

  editTask(id: number, content: string): void {
    const todos = this.getAllTasks().map(todo => {
      if (todo.id === id) {
        return { ...todo, content };
      }
      return todo;
    });
    this.saveTasks(todos);
  }

  markCompletedByIds(ids: number[], completed: boolean): void {
    const todos = this.getAllTasks().map(todo => {
      if (ids.includes(todo.id)) {
        return { ...todo, completed: completed };
      }
      return todo;
    });
    this.saveTasks(todos);
  }

  private saveTasks(todos: TaskItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
