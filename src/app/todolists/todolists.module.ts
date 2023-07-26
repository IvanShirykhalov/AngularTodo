import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodolistsRoutingModule } from 'src/app/todolists/todolists-routing.module'
import { TodolistsComponent } from 'src/app/todolists/todolists/todolists.component'
import { TodolistComponent } from './todolists/todolist/todolist.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [TodolistsComponent, TodolistComponent],
  imports: [CommonModule, TodolistsRoutingModule, FormsModule],
})
export class TodolistsModule {}
