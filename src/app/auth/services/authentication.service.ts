import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  setTokenSessionStorage(token: any){
    sessionStorage.setItem('token', token);
  }
  isLogged(): boolean{
    return sessionStorage.getItem('token') ? true : false;
  }
}
