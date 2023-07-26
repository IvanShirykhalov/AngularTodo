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

  deleteTodolist() {
    this.deleteTodolistEvent.emit(this.todo.id)
  }
}
