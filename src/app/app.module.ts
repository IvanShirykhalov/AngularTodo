import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from 'src/app/auth/auth.module'
import { TodolistsModule } from 'src/app/todolists/todolists.module'
import { CoreModule } from 'src/app/core/core.module'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TodolistsModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
