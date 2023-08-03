import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/enviroments/enviroment'
import { CommonResponseType } from 'src/app/core/models/core.models'
import { ResultCodeEnum } from 'src/app/core/enums/resultCode.enum'
import { Router } from '@angular/router'
import { LoginRequestData, MeResponse } from 'src/app/auth/models/auth.model'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from 'src/app/core/services/notification.service'

@Injectable()
export class AuthService {
  isAuth = false

  resolveAuthRequest: Function = () => {}
  authRequest = new Promise((resolve, reject) => {
    this.resolveAuthRequest = resolve
  })

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.ErrorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.Success) {
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  logout() {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.ErrorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.Success) {
          this.router.navigate(['/login'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  authMe() {
    this.http
      .get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.ErrorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.Success) {
          this.isAuth = true
        }

        this.resolveAuthRequest()
      })
  }

  private ErrorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message)
    return EMPTY
  }
}
