import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientTravelService {

  urlNode = environment.routerBackend;

  constructor(private http: HttpClientTravelService, private router: Router) {}
    getClientTravel(): Observable<any> {
      return this.http.get(`${this.urlNode}/client-travel`);
    }
  }
