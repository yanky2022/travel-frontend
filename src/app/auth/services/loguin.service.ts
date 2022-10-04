import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoguinService {

  urlNode = environment.routerBackend;

  constructor(private http: HttpClient, private router: Router) {}

  openLoguin(params: any): Observable<any> {
    return this.http.post(`${this.urlNode}/loguin`, params);
  }

  closeLoguin(): Observable<any> {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('surname');
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('id');
    return this.http.get('${this.urlNode}');
  }

}
