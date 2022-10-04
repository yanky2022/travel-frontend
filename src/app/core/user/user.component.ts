import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { withDebugTracing } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public lisuser: any;
  public flatEdit = false;

  formUser: FormGroup = this.formBuilder.group({
    _id: [""],
    name: ["", Validators.required],
    surname: ["", Validators.required],
    document_type: ["", Validators.required],
    number: ["", Validators.required],
    user: ["", Validators.required],
    passport: ["", Validators.required],
    email: ["", Validators.required],
    profile: ["", Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public createUser(): void {
    if (this.formUser.valid){
      const data =this.formUser.value;
      this.userService.createUser(data).subscribe((data)=>{
        if(data){
          this.formUser.reset();
          this.getUsers();
          this.alert('Creacion Usuario',data.message,'info')
        } else {
          this.alert('Error al crear el Usuario','Error al guardar el Usuario','error')
        }
      })
    }else{
      this.alert('Error al crear Usuario','Validar datos ingresados','error')
    }
  }

  public editUser(user: any): void {
    this.flatEdit = true
    this.formUser.patchValue(user)
  }

  public updateUser(): void {
    if (this.formUser.valid){
      const data =this.formUser.value;
      console.log(this.formUser.value)
      this.userService.updateUser(data).subscribe((data)=>{
        if(data){
          this.formUser.reset();
          this.getUsers();
          this.flatEdit = false;
          this.alert('Actualizacion de Usuario',data.message,'info')
        } else {
          this.alert('Error al Actualizar el Usuario','Error al Actualizar el Usuario','error')
        }
      })
    }else{
      this.alert('Error al Actualizar Usuario','Validar datos ingresados','error')
    }
  }

  public deleteUser(user: any): void {
    this.userService.deleteUser(user._id).subscribe(
      response =>{
        if(response){
          this.getUsers();
          this.alert('Eliminacion de  Usuario',response.message,'info')
        } else {
          this.alert('Error al Eliminar el Usuario','Error al Eliminar el Usuario','error')
        }
      }
    );
}
  public getUsers(): void {

    this.userService.getUsers().subscribe(
      response =>{
        this.lisuser=response.users
      },
      error => {
        console.log(<any>error);
}
    );
}


  public alert(titulo: any, text: any, icon: any): void {
    Swal.fire({
      title: titulo,
      text: text,
      icon: icon
    })
  }

}
