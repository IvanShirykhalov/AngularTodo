import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CredentialsInterceptor } from 'src/app/core/interceptors/credentials.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true }],
})
export class CoreModule {}