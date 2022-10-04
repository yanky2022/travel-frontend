import { CanActivate, Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate() {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      this._router.navigateByUrl('');
      return false;
    }
  }
}
