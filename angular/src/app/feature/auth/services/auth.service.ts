import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, ResponseLogin } from '@auth/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  urlApi: string = environment.EXPRESS_URL_API || 'http://127.0.0.1:5000/api'

  constructor(private http: HttpClient) { }

  postLogin(user: Login): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.urlApi}/users/login`, user);
  }
}
