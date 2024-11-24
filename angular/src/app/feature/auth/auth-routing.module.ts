import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Panel de Administración - Login' },
  { path: 'register', component: RegisterComponent, title: 'Panel de Administración - Register' },
  { path: 'forget-password', component: ForgetPasswordComponent, title: 'Panel de Administración - Forget Password' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
