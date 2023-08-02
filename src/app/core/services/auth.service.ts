import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/enviroments/enviroment'
import { CommonResponseType } from 'src/app/core/models/core.models'
import { TasksStatusEnum } from 'src/app/core/enums/tasksStatus.enum'
import { ResultCodeEnum } from 'src/app/core/enums/resultCode.enum'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: any) {
    this.http
      .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.Success) {
          this.router.navigate(['/'])
        }
      })
  }

  logout() {
    this.http.delete<CommonResponseType>(`${environment.baseUrl}/auth/login`).subscribe(res => {
      if (res.resultCode === ResultCodeEnum.Success) {
        this.router.navigate(['/login'])
      }
    })
  }

  authMe() {
    this.http.get(`${environment.baseUrl}/auth/me`).subscribe(() => {})
  }
}
