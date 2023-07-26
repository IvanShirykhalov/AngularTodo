import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodolistsComponent } from 'src/app/todolists/todolists/todolists.component'

const routes: Routes = [{ path: '', component: TodolistsComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistsRoutingModule {}
