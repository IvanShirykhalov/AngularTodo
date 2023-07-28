import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/enviroments/enviroment'
import { Task } from 'src/app/todolists/models/tasks.model'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<Task[]>([])

  constructor(private http: HttpClient) {}

  getTasks(todolistId: string) {
    this.http
      .get<Task[]>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`)
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }
}
