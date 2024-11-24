import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, ResponseLogin } from '../shared/models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  postLogin(user: Login): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`http://localhost:3000/api/users/login`, user, {
      headers: {
        'API_KEY': 'dev',
      }
    });
  }
}
