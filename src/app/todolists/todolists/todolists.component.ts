import { Component, OnInit } from '@angular/core'
import { TodolistsService } from 'src/app/todolists/services/todolists.service'
import { Observable } from 'rxjs'
import { Todo } from 'src/app/todolists/models/todolist.model'

@Component({
  selector: 'tl-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.scss'],
})
export class TodolistsComponent implements OnInit {
  todos$!: Observable<Todo[]>
  todoTitle = ''

  constructor(private todolistsService: TodolistsService) {}

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
}
