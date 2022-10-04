import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlNode = environment.routerBackend;

  constructor(private http: HttpClient, private router: Router) {}

  createClient(params: any): Observable<any> {
    return this.http.post(`${this.urlNode}/client`, params);
  }
  updateClient(params: any): Observable<any> {
    return this.http.put(`${this.urlNode}/client/${params._id}`, params);
  }
  deleteClient(params: any): Observable<any> {
    return this.http.delete(`${this.urlNode}/client/${params}`);
  }
  getClients(): Observable<any> {
    return this.http.get(`${this.urlNode}/clients`);
  }

  clientsByIdUser(params: any): Observable<any>{
    return this.http.post(`${this.urlNode}/client-travel`, params);
  }

  clientByStatus(params: any): Observable<any>{
    return this.http.post(`${this.urlNode}/client-status`, params);
  }

}
