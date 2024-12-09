import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Login, ResponseLogin } from '@auth/shared/models';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user$!: Observable<ResponseLogin>;
  isError: boolean = false;
  isShowPassword: boolean = false;

  constructor(private authServices: AuthService, private router: Router, private toastr: ToastrService) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onLogin() {
    const loginData: Login = {
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || ''
    };
    if (loginData.username && loginData.password) {
      this.isError = false;
      this.authServices.postLogin(loginData).subscribe(
        (response) => {
          console.warn('Login successful', response);
          if(response.auth) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Login failed', response.auth)
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.toastr.error(error.message , 'Error');
        }
      );
    } else {
      this.isError = true;
      this.toastr.error('Los campos no pueden estar vacios.', 'Error');
    }
  }

  switchPassword() {
    this.isShowPassword = !this.isShowPassword
  }
}
