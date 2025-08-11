import { TestBed } from '@angular/core/testing';

import { TaskStorageService } from './task-storage.service';

describe('TaskStorageService', () => {
  let service: TaskStorageService;
  let store: { [key: string]: string };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStorageService);

    store = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string | null => {
      return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): void => {
      store[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllTasks should return empty array if no tasks', () => {
    expect(service.getAllTasks()).toEqual([]);
  });

  it('addTask should add a task and save to localStorage', () => {
    const content = 'Test task';
    const newTask = service.addTask(content);

    const savedTasks = JSON.parse(store['task_items']);
    expect(savedTasks.length).toBe(1);
    expect(savedTasks[0].content).toBe(content);
    expect(newTask).toEqual(savedTasks[0]);
  });

  it('deleteTasksByIds should remove tasks by ids', () => {
    const tasks = [
      { id: 1, content: 'Task 1', completed: false },
      { id: 2, content: 'Task 2', completed: false }
    ];
    store['task_items'] = JSON.stringify(tasks);

    service.deleteTasksByIds([1]);

    const savedTasks = JSON.parse(store['task_items']);
    expect(savedTasks.length).toBe(1);
    expect(savedTasks[0].id).toBe(2);
  });

  it('editTodo should update task content', () => {
    const tasks = [{ id: 1, content: 'Old content', completed: false }];
    store['task_items'] = JSON.stringify(tasks);

    service.editTask(1, 'New content');

    const savedTasks = JSON.parse(store['task_items']);
    expect(savedTasks[0].content).toBe('New content');
  });

  it('markCompletedByIds should update completed status', () => {
    const tasks = [
      { id: 1, content: 'Task 1', completed: false },
      { id: 2, content: 'Task 2', completed: false }
    ];
    store['task_items'] = JSON.stringify(tasks);

    service.markCompletedByIds([1], true);

    const savedTasks = JSON.parse(store['task_items']);
    expect(savedTasks.find((t: { id: number; }) => t.id === 1)?.completed).toBe(true);
    expect(savedTasks.find((t: { id: number; }) => t.id === 2)?.completed).toBe(false);
  });
});

