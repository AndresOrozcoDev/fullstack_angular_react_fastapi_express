import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Response, ResponseLogin } from '@auth/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  urlApi: string = environment.EXPRESS_URL_API || 'http://127.0.0.1:5000/api'

  constructor(private http: HttpClient) { }

  postLogin(user: Login): Observable<Response> {
    return this.http.post<Response>(`${this.urlApi}/auth/login`, user);
  }
}
