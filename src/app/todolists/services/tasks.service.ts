import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
import { environment } from 'src/enviroments/enviroment'
import {
  DomainTask,
  GetTasksResponseType,
  Task,
  UpdateTaskModel,
} from 'src/app/todolists/models/tasks.model'
import { CommonResponseType } from 'src/app/core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<DomainTask>({})

  constructor(private http: HttpClient) {}

  getTasks(todolistId: string) {
    return this.http
      .get<GetTasksResponseType>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`)
      .pipe(map(t => t.items))
      .subscribe((tasks: Task[]) => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todolistId] = tasks
        this.tasks$.next(stateTasks)
      })
  }

  createTask(data: { todolistId: string; title: string }) {
    this.http
      .post<CommonResponseType<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks`,
        { title: data.title.trim() }
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          const newTask = res.data.item
          stateTasks[data.todolistId] = [newTask, ...stateTasks[data.todolistId]]
          return stateTasks
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }

  removeTask(data: { todolistId: string; taskId: string }) {
    this.http
      .delete<CommonResponseType>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks/${data.taskId}`
      )
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue()
          const tasksForTodo = stateTasks[data.todolistId]
          stateTasks[data.todolistId] = tasksForTodo.filter(t => t.id !== data.taskId)
          return stateTasks
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }

  updateTaskStatus(data: { taskId: string; todolistId: string; model: UpdateTaskModel }) {
    this.http
      .put(`${environment.baseUrl}/todo-lists/${data.todolistId}/tasks/${data.taskId}`, data.model)
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue()
          const tasksForTodo = stateTasks[data.todolistId]
          stateTasks[data.todolistId] = tasksForTodo.map(t =>
            t.id === data.taskId ? { ...t, ...data.model } : t
          )
          return stateTasks
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }
}
