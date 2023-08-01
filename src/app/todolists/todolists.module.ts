import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodolistsRoutingModule } from 'src/app/todolists/todolists-routing.module'
import { TodolistsComponent } from 'src/app/todolists/todolists/todolists.component'
import { TodolistComponent } from './todolists/todolist/todolist.component'
import { FormsModule } from '@angular/forms'
import { TasksComponent } from './todolists/todolist/tasks/tasks.component';
import { TaskComponent } from './todolists/todolist/tasks/task/task.component';
import { FilteringBtnComponent } from './todolists/todolist/filtering-btn/filtering-btn.component';
import { TodoFooterComponent } from './todolists/todolist/todo-footer/todo-footer.component'

@NgModule({
  declarations: [TodolistsComponent, TodolistComponent, TasksComponent, TaskComponent, FilteringBtnComponent, TodoFooterComponent],
  imports: [CommonModule, TodolistsRoutingModule, FormsModule],
})
export class TodolistsModule {}
