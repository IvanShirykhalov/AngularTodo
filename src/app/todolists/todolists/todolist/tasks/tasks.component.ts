import { Component, Input, OnInit } from '@angular/core'
import { combineLatest, map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from 'src/app/todolists/models/tasks.model'
import { TasksService } from 'src/app/todolists/services/tasks.service'
import { TodolistsService } from 'src/app/todolists/services/todolists.service'
import { TasksStatusEnum } from 'src/app/core/enums/tasksStatus.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  tasks$!: Observable<Task[]>
  taskTitle = ''

  constructor(
    private taskService: TasksService,
    private todolistsService: TodolistsService
  ) {}

  ngOnInit(): void {
    this.tasks$ = combineLatest([this.taskService.tasks$, this.todolistsService.todos$]).pipe(
      map(res => {
        let tasks = res[0][this.todoId]
        const todos = res[1]
        const activeTodo = todos.find(tl => tl.id === this.todoId)

        if (activeTodo?.filter === 'active') {
          tasks = tasks.filter(t => t.status === TasksStatusEnum.active)
        }

        if (activeTodo?.filter === 'completed') {
          tasks = tasks.filter(t => t.status === TasksStatusEnum.completed)
        }

        return tasks
      })
    )

    this.taskService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.taskService.createTask({ title: this.taskTitle, todolistId: this.todoId })
    this.taskTitle = ''
  }

  removeTask(data: { todolistId: string; taskId: string }) {
    this.taskService.removeTask(data)
  }

  changeTask(data: { taskId: string; todolistId: string; model: UpdateTaskModel }) {
    this.taskService.updateTaskStatus(data)
  }
}
