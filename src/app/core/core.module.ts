import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CredentialsInterceptor } from 'src/app/core/interceptors/credentials.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthService } from 'src/app/core/services/auth.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { AuthGuard } from 'src/app/core/guards/auth.guard'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthService,
    NotificationService,
    AuthGuard,
  ],
})
export class CoreModule {}
