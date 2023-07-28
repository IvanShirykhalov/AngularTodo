import { Component, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { Task } from 'src/app/todolists/models/tasks.model'
import { TasksService } from 'src/app/todolists/services/tasks.service'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  tasks$!: Observable<Task[]>
  taskTitle = ''

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$.pipe(
      map(tasks => {
        return tasks[this.todoId]
      })
    )

    this.taskService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.taskService.createTask({ title: this.taskTitle, todolistId: this.todoId })
    this.taskTitle = ''
  }
}
