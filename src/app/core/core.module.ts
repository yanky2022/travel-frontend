import { CoreComponent } from './core.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TravelComponent } from './travel/travel.component';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './client/client.component';
import { CarComponent } from './car/car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [CarComponent, ClientComponent, UserComponent, TravelComponent, NavbarComponent, CoreComponent],
  imports: [CommonModule, CoreRoutingModule, FormsModule, ReactiveFormsModule,HttpClientModule],
})
export class CoreModule {}
