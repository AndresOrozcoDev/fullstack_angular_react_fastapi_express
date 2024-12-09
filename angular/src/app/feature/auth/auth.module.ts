import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@auth/pages/login/login.component';
import { RegisterComponent } from '@auth/pages/register/register.component';
import { apiKeyInterceptor } from '@auth/shared/interceptors/api-key.interceptor';
import { ForgetPasswordComponent } from '@auth/pages/forget-password/forget-password.component';
import { LoadingComponent } from './shared/loading/loading.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    MatIconModule,
    LoadingComponent
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
