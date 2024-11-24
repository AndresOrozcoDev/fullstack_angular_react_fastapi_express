import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Login, ResponseLogin } from '../../shared/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user$!: Observable<ResponseLogin>;
  isError: boolean = false;

  constructor(private authServices: AuthService, private router: Router) {}

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
        }
      );
    } else {
      this.isError = true;
      console.warn('Username or password is missing');
    }
  }
}
