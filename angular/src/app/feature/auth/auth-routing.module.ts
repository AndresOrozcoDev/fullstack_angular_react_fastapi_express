import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { validateTokenGuard } from './shared/guards/validate-token.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Panel de Administración - Login' },
  { path: 'register', component: RegisterComponent, title: 'Panel de Administración - Register' },
  { path: 'forget-password', component: ForgetPasswordComponent, title: 'Panel de Administración - Forget Password' },
  { path: 'dashboard', component: DashboardComponent, title: 'Panel de Administración - Dashboard', canActivate: [validateTokenGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
