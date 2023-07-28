import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
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

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.taskService.getTasks(this.todoId)
  }
}
