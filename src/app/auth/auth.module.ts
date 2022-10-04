import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoguinComponent } from './loguin/loguin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoguinComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
