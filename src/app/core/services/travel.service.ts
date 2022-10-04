import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  urlNode = environment.routerBackend;

  constructor(private http: HttpClient, private router: Router) {}

  createTravel(params: any): Observable<any> {
    return this.http.post(`${this.urlNode}/travel`, params);
  }

  updateTravel(params: any): Observable<any> {
    return this.http.put(`${this.urlNode}/travel/${params._id}`, params);
  }
  deleteTravel(params: any): Observable<any> {
    return this.http.delete(`${this.urlNode}/Travel/${params._id}`, params);
  }
  getTravels(): Observable<any> {
    return this.http.get(`${this.urlNode}/travels`);
  }
  getTravelsFalse(): Observable<any> {
    return this.http.get(`${this.urlNode}/travelsfalse`);
  }
  clientsByIdTravel(params: any): Observable<any> {
    return this.http.post(`${this.urlNode}/travel-client`,params);
  }
}
