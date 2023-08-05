import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/core/services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    await this.authService.authRequest
    const isAuth = this.authService.isAuth

    if (!isAuth) {
      this.router.navigate(['/login'])
    }
    return isAuth
  }
}
