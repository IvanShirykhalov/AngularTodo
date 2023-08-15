import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/enviroments/enviroment'
import { DomainTodo, FilterType, Todo } from 'src/app/todolists/models/todolists.model'
import { BehaviorSubject, catchError, map } from 'rxjs'
import { CommonResponseType } from 'src/app/core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TodolistsService {
  todos$ = new BehaviorSubject<DomainTodo[]>([])

  constructor(private http: HttpClient) {}

  getTodolists() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map(todos => {
          const newTodos: DomainTodo[] = todos.map(tl => ({ ...tl, filter: 'all' }))
          return newTodos
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  createTodolist(title: string) {
    this.http
      .post<CommonResponseType<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, {
        title: title.trim(),
      })
      .pipe(
        map(res => {
          const newTodo: DomainTodo = { ...res.data.item, filter: 'all' }
          return [newTodo, ...this.todos$.getValue()]
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

  changeFilter(data: { filter: FilterType; todoId: string }) {
    const newTodos = this.todos$
      .getValue()
      .map(tl => (tl.id === data.todoId ? { ...tl, filter: data.filter } : tl))
    this.todos$.next(newTodos)
  }
}
