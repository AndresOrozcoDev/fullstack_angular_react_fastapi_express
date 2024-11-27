import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { apiKeyInterceptor } from './shared/interceptors/api-key.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => apiKeyInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
