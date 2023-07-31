import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskModel } from 'src/app/todolists/models/tasks.model'
import { TasksStatusEnum } from 'src/app/core/enums/tasksStatus.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTasksEvent = new EventEmitter<{ todolistId: string; taskId: string }>()
  @Output() changeTaskEvent = new EventEmitter<{
    taskId: string
    todolistId: string
    model: UpdateTaskModel
  }>()
  tasksStatusEnum = TasksStatusEnum
  editMode = false
  newTitle = ''

  removeTaskHandler() {
    this.removeTasksEvent.emit({ taskId: this.task.id, todolistId: this.task.todoListId })
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked

    this.changeTask({
      status: newStatus ? this.tasksStatusEnum.completed : this.tasksStatusEnum.active,
    })
  }

  activateEditModeHandler() {
    this.editMode = true
    this.newTitle = this.task.title
  }

  editTitleHandler() {
    this.editMode = false

    this.changeTask({ title: this.newTitle })
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      completed: this.task.completed,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.addedDate,
      status: this.task.status,
      title: this.task.title,
      ...patch,
    }
    this.changeTaskEvent.emit({ taskId: this.task.id, todolistId: this.task.todoListId, model })
  }
}
