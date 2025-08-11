import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListComponent } from './tasks-list.component';
import { TaskStorageService } from '../../services/task-storage.service';
import { TaskItem } from '../../models/TaskItem';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let mockStorageService: jasmine.SpyObj<TaskStorageService>;

  const createMockTasks = (): TaskItem[] => [
    { id: 1, content: 'Task 1', completed: false },
    { id: 2, content: 'Task 2', completed: true },
  ];

  beforeEach(async () => {
    mockStorageService = jasmine.createSpyObj('TaskStorageService', [
      'getAllTasks',
      'addTask',
      'editTask',
      'deleteTasksByIds',
      'markCompletedByIds'
    ]);

    mockStorageService.getAllTasks.and.callFake(() => createMockTasks());
    mockStorageService.addTask.and.callFake((content: string) => {
      return { id: Date.now(), content, completed: false };
    });

    await TestBed.configureTestingModule({
      imports: [TasksListComponent],
      providers: [
        { provide: TaskStorageService, useValue: mockStorageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and load tasks', () => {
    expect(component).toBeTruthy();
    expect(component.tasks?.length).toBe(2);
  });

  it('should add a new task', () => {
    //arrange
    const initialLength = component.tasks!.length;
    component.newTaskContent = 'New Task';

    //act
    component.addOrEditTask(component.newTaskContent);

    //assert
    expect(mockStorageService.addTask).toHaveBeenCalledWith('New Task');
    expect(component.tasks!.length).toBe(initialLength + 1);
    expect(component.tasks?.some(t => t.content === 'New Task')).toBeTrue();
    expect(component.newTaskContent).toBe('');
  });

  it('should not add task if content is empty', () => {
    //arrange
    component.newTaskContent = '';

    //act
    component.addOrEditTask(component.newTaskContent);

    //assert
    expect(mockStorageService.addTask).not.toHaveBeenCalled();
  });

  it('should edit a task', () => {
    //arrange
    const taskToEdit = component.tasks![0];

    //act
    component.editTask(taskToEdit);

    //assert
    expect(component.buttonText).toBe('Edit');
    expect(component.newTaskContent).toBe(taskToEdit.content);
    expect(component.editingId).toBe(taskToEdit.id);

    //arrange
    const newContent = 'Edited content';

    //act
    component.addOrEditTask(newContent);

    //assert
    expect(mockStorageService.editTask).toHaveBeenCalledWith(taskToEdit.id, newContent);
    expect(component.tasks?.find(t => t.id === taskToEdit.id)?.content).toBe(newContent);
    expect(component.buttonText).toBe('Add todo');
    expect(component.editingId).toBeNull();
    expect(component.newTaskContent).toBe('');
  });

  it('should delete a task', () => {
    //arrange
    const taskId = component.tasks![0].id;

    //act
    component.deleteTask(taskId);

    //assert
    expect(mockStorageService.deleteTasksByIds).toHaveBeenCalledWith([taskId]);
    expect(component.tasks?.find(t => t.id === taskId)).toBeUndefined();
  });

  it('should delete selected (completed) tasks', () => {
    //act
    component.deleteSelectedTasks();

    //assert
    expect(mockStorageService.deleteTasksByIds).toHaveBeenCalledWith([2]);
    expect(component.tasks?.find(t => t.id === 2)).toBeUndefined();
  });

  it('should toggle task selection', () => {
    //arrange
    const task = component.tasks![0];
    const event = { target: { checked: true } } as unknown as Event;

    //act
    component.toggleTaskSelection(task, event);

    //assert
    expect(mockStorageService.markCompletedByIds).toHaveBeenCalledWith([task.id], true);
    expect(component.tasks?.find(t => t.id === task.id)?.completed).toBeTrue();
  });
});
