import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TaskStorageService} from '../../services/task-storage.service';
import {TaskItem} from '../../models/TaskItem';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  imports: [
    FormsModule
  ],
  templateUrl: './tasks-list.component.html',
  standalone: true,
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  private addButtonText = "Add todo";
  private editButtonText = "Edit";
  tasks: TaskItem[] | undefined;
  newTaskContent: string | undefined;
  buttonText: string = this.addButtonText;
  editingId: number | null = null;
  @ViewChildren('cb') checkboxes!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private storageService: TaskStorageService) {
  }

  ngOnInit(): void {
    this.tasks = this.storageService.getAllTasks();
  }

  addOrEditTask(content: string | undefined): void {
    if (content === undefined || content === '') {
      return
    }

    if(this.buttonText === this.addButtonText) {
      const addedTask = this.storageService.addTask(content);
      this.tasks?.push(addedTask);
    } else if(this.buttonText === this.editButtonText) {
      if(this.editingId)
        this.storageService.editTask(this.editingId, content);

      const editedTask = this.tasks?.find(task => task.id === this.editingId);

      if (editedTask) {
        editedTask.content = content;
      }

      this.editingId = null;
      this.buttonText = this.addButtonText;
    }

    this.newTaskContent = "";
  }

  deleteTask(id: number): void {
    this.storageService.deleteTasksByIds([id]);
    this.tasks = this.tasks?.filter(task => task.id !== id);
  }

  editTask(task: TaskItem): void {
    this.buttonText = this.editButtonText;
    this.newTaskContent = task.content;
    this.editingId = task.id;
  }

  deleteSelectedTasks():void{
    const selectedIds = this.tasks?.
      filter(task => task.completed)
      .map(task => task.id);

    if(selectedIds){
      this.storageService.deleteTasksByIds(selectedIds)
      this.tasks = this.tasks?.filter(task => !selectedIds.includes(task.id));
    }
  }

  toggleTaskSelection(task: TaskItem, $event: Event): void {
    const checked = ($event.target as HTMLInputElement).checked;

    this.storageService.markCompletedByIds([task.id], checked)

    const t = this.tasks?.find(t => t.id === task.id);
    if (t) {
      t.completed = checked;
    }
  }
}
