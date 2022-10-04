import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public profile: string | null = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.profile = sessionStorage.getItem('profile')
  }

  public endSesion(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('surname');
    sessionStorage.removeItem('profile');
    this.router.navigateByUrl('')
  }

}
