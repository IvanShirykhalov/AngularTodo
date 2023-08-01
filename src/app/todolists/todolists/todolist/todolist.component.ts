import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DomainTodo, FilterType } from 'src/app/todolists/models/todolists.model'
import { TodolistsService } from 'src/app/todolists/services/todolists.service'

@Component({
  selector: 'tl-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todo!: DomainTodo
  @Output() deleteTodolistEvent = new EventEmitter<string>()
  @Output() editTodolistEvent = new EventEmitter<{ id: string; title: string }>()
  editMode = false
  newTitle = ''

  constructor(private todolistsService: TodolistsService) {}

  deleteTodolist() {
    this.deleteTodolistEvent.emit(this.todo.id)
  }

  activateEditModeHandler() {
    this.newTitle = this.todo.title
    this.editMode = true
  }

  editTitleHandler() {
    this.editMode = false
    this.editTodolistEvent.emit({ id: this.todo.id, title: this.newTitle })
  }

  changeFilter(filter: FilterType) {
    this.todolistsService.changeFilter({ filter, todoId: this.todo.id })
  }
}
