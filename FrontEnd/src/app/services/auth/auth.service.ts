import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = `${environment.baseUrl}`;
  authState: EventEmitter<string> = new EventEmitter<string>()

  constructor(private http: HttpClient) { }

  getToken() {
    const token = localStorage.getItem("currentuser") && JSON.parse(localStorage.getItem("currentuser"))?.token;
    return token ? `Bearer ${token}` : null;
  }
  checkUser(){
    return localStorage.getItem("currentuser");
  }

  login(email, password, type ="user") {
    const url = `${this.baseUrl}/${type}/login`;
    return this.http.post(url, {
      email,
      password
    });
  }

  setToken(data) {
    localStorage.setItem("currentuser", JSON.stringify(data))
  }

  logout( type ="user") {
    localStorage.removeItem("currentuser");
    const url = `${this.baseUrl}/${type}/logout`;
    return this.http.post(url, {});
  }
}