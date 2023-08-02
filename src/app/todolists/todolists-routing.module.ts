import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodolistsComponent } from 'src/app/todolists/todolists/todolists.component'
import { AuthGuard } from 'src/app/core/guards/auth.guard'

const routes: Routes = [{ path: '', component: TodolistsComponent, canActivate: [AuthGuard] }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodolistsRoutingModule {}
