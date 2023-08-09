import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'tl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ],
      updateOn: 'blur',
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      //validators: [Validators.required, Validators.pattern('[a-zA-Z0-9!@#$%^&*]{4,}$')],
      validators: [Validators.required, Validators.minLength(4)],
    }),
    rememberMe: new FormControl<boolean>(false, { nonNullable: true }),
  })

  constructor(private authService: AuthService) {}

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onLoginSubmit() {
    this.authService.login(this.loginForm.value)
  }
}
