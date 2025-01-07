import { lastValueFrom, Observable } from 'rxjs';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Login, Response, ResponseLogin } from '@auth/shared/models';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@auth/services/loading.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user$!: Observable<Response>;
  isError: boolean = false;
  isShowPassword: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authServices: AuthService, 
    private router: Router, 
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async onLogin() {
    if (this.loginForm.valid) {
      this.isError = false;
      this.loadingService.show();
      try {
        const loginData: Login = this.loginForm.value;
        const response: Response = await lastValueFrom(this.authServices.postLogin(loginData));

        if (response.data.auth) {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error(response.message);
        }
        this.loadingService.hide();
      } catch (error: any) {
        this.toastr.error(error.error.message);
        this.loadingService.hide();
        this.loginForm.reset();
      }
    } else {
      this.isError = true;
      this.toastr.error('Los campos no pueden estar vacíos.');
      this.loadingService.hide();
    }
  }

  switchPassword() {
    this.isShowPassword = !this.isShowPassword
  }
}