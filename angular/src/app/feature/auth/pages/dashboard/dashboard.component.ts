import { Component } from '@angular/core';
import { User } from '@auth/shared/models';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userDecoded$!: User;

  constructor() {}

  ngOnInit() {
    const token = localStorage.getItem('token')
    if(token) {
      this.decode(token);
    } else {
      console.error('Token not found');
    }
  }

  decode(token: string) {
    try {
      this.userDecoded$ = jwtDecode(token);
      console.log(this.userDecoded$);
    } catch(error) {
      console.error('Error al decodificar el token', error);
    }
  }
}
