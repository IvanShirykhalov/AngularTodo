import { Component, OnInit } from '@angular/core'
import { TodolistsService } from 'src/app/todolists/services/todolists.service'
import { Observable } from 'rxjs'
import { DomainTodo } from 'src/app/todolists/models/todolists.model'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'tl-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.scss'],
})
export class TodolistsComponent implements OnInit {
  todos$!: Observable<DomainTodo[]>
  todoTitle!: string

  constructor(
    private todolistsService: TodolistsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.todos$ = this.todolistsService.todos$

    this.todolistsService.getTodolists()
  }

  createTodolist() {
    this.todolistsService.createTodolist(this.todoTitle)
    this.todoTitle = ''
  }

  deleteTodolist(id: string) {
    this.todolistsService.deleteTodolist(id)
  }

  updateTodolist(data: { title: string; id: string }) {
    this.todolistsService.updateTodolist({ title: data.title, id: data.id })
  }

  logoutHandler() {
    this.authService.logout()
  }
}
