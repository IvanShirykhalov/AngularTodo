import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from 'src/app/todolists/models/todolist.model'

@Component({
  selector: 'tl-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent {
  @Input() todo!: Todo
  @Output() deleteTodolistEvent = new EventEmitter<string>()
  @Output() editTodolistEvent = new EventEmitter<{ id: string; title: string }>()
  editMode = false
  newTitle = ''

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
}
