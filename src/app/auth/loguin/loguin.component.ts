import { AuthenticationService } from './../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2'
import { LoguinService } from '../services/loguin.service';



@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss'],
})
export class LoguinComponent implements OnInit {
  formLoguin: FormGroup = this.formbuilder.group({
    user: ['', Validators.required],
    pass: ['', Validators.required],
  });

  constructor(private router: Router, private formbuilder: FormBuilder, private loguinService:LoguinService, private authenticationService:AuthenticationService) {}

  ngOnInit(): void {}

  public loguin(): void {
    if (this.formLoguin.valid){
           const dataLoguin =this.formLoguin.value;
           this.loguinService.openLoguin(dataLoguin).subscribe((data)=>{

            if(data.status){
              console.log (data.response);
              sessionStorage.setItem('token',data.response.token);
              sessionStorage.setItem('name',data.response.user.name);
              sessionStorage.setItem('surname',data.response.user.surname);
              sessionStorage.setItem('profile',data.response.user.profile);
              sessionStorage.setItem('id',data.response.user._id);
              this.intLoguin();

            } else {
              this.alert('Error de Inicio de Sesion',data.message,'error')
            }
           })
    }else{
      this.alert('Error de Inicio de Sesion','Validar datos ingresados','error')
    }
  }

  public alert(titulo: any, text: any, icon: any): void {
    Swal.fire({
      title: titulo,
      text: text,
      icon: icon
    })
  }

  public intLoguin(){
    if (this.authenticationService.isLogged()){
      this.router.navigateByUrl('dashboard');
    }
  }
}
