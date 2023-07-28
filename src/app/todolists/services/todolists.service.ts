import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/enviroments/enviroment'
import { Todo } from 'src/app/todolists/models/todolists.model'
import { BehaviorSubject, map } from 'rxjs'
import { CommonResponseType } from 'src/app/core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TodolistsService {
  todos$ = new BehaviorSubject<Todo[]>([])

  constructor(private http: HttpClient) {}

  getTodolists() {
    this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`).subscribe(todos => {
      this.todos$.next(todos)
    })
  }

  createTodolist(title: string) {
    this.http
      .post<CommonResponseType<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          return [res.data.item, ...this.todos$.getValue()]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  deleteTodolist(id: string) {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/todo-lists/${id}`)
      .pipe(
        map(() => {
          return this.todos$.getValue().filter(tl => tl.id !== id)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  updateTodolist(data: { title: string; id: string }) {
    this.http
      .put<CommonResponseType>(`${environment.baseUrl}/todo-lists/${data.id}`, {
        title: data.title,
      })
      .pipe(
        map(() => {
          return this.todos$
            .getValue()
            .map(tl => (tl.id === data.id ? { ...tl, title: data.title } : tl))
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
}
