import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlNode = environment.routerBackend;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(params: any): Observable<any> {
    return this.http.post(`${this.urlNode}/user`, params);
  }
  updateUser(params: any): Observable<any> {
    return this.http.put(`${this.urlNode}/user/${params._id}`, params);
  }
  deleteUser(params: any): Observable<any> {
    return this.http.delete(`${this.urlNode}/user/${params}`);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.urlNode}/users`);
  }
  queryUserByProfile(): Observable<any> {
    return this.http.get(`${this.urlNode}/user-profile`);
  }


}
