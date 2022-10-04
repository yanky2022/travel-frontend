import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  urlNode = environment.routerBackend;

  constructor(private http: HttpClient, private router: Router) {}

  createCar(params: any): Observable<any> {
    return this.http.post(`${this.urlNode}/car`, params);
  }
  updateCar(params: any): Observable<any> {
    return this.http.put(`${this.urlNode}/car/${params._id}`, params);
  }
  deleteCar(params: any): Observable<any> {
    return this.http.delete(`${this.urlNode}/car/${params}`);
  }
  getCars(): Observable<any> {
    return this.http.get(`${this.urlNode}/cars`);
  }
 carByIdUser(params: any): Observable<any>{
    return this.http.post(`${this.urlNode}/client-owner`, params);
  }

}
