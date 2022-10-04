import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../services/cliente.service';
import { withDebugTracing } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public lisclient: any;
  public flatEdit = false;

  formClient: FormGroup = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    starting_point: ['', Validators.required],
    final_point: ['', Validators.required],
    assigned: [''],
    idUser: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.publicLoadDataInit()
    this.clientsByIdUser();
  }

  publicLoadDataInit(): void {
    this.formClient.get('idUser')?.setValue(sessionStorage.getItem('id'));
    this.formClient.get('name')?.setValue(sessionStorage.getItem('name'));
    this.formClient.get('surname')?.setValue(sessionStorage.getItem('surname'));
  }

  public createClient(): void {
    if (this.formClient.valid) {
      const data = this.formClient.value;
      data.assigned = false;

      this.clienteService.createClient(data).subscribe((data) => {
        if (data) {
          this.formClient.reset();
          this.publicLoadDataInit()
          this.clientsByIdUser();
          this.alert('Creacion Cliente', data.message, 'info');
        } else {
          this.alert(
            'Error al crear el cliente',
            'Error al guardar el cliente',
            'error'
          );
        }
      });
    } else {
      this.alert('Error al crear cliente', 'Validar datos ingresados', 'error');
    }
  }

  public editClient(client: any): void {
    this.flatEdit = true;
    this.formClient.patchValue(client);
  }

  public updateClient(): void {
    if (this.formClient.valid) {
      const data = this.formClient.value;
      console.log(this.formClient.value);
      this.clienteService.updateClient(data).subscribe((data) => {
        if (data) {
          this.formClient.reset();
          this.publicLoadDataInit()
          this.clientsByIdUser();
          this.flatEdit = false;
          this.alert('Actualizacion de Cliente', data.message, 'info');
        } else {
          this.alert(
            'Error al Actualizar el Cliente',
            'Error al Actualizar el Cliente',
            'error'
          );
        }
      });
    } else {
      this.alert(
        'Error al Actualizar Cliente',
        'Validar datos ingresados',
        'error'
      );
    }
  }

  public deleteClient(client: any): void {
    this.clienteService.deleteClient(client._id).subscribe((response) => {
      if (response) {
        this.clientsByIdUser();
        this.alert('Eliminacion de  Cliente', response.message, 'info');
      } else {
        this.alert(
          'Error al Eliminar el Cliente',
          'Error al Eliminar el Cliente',
          'error'
        );
      }
    });
  }
  public clientsByIdUser(): void {
    const data = {idUser:sessionStorage.getItem('id')}
    this.clienteService.clientsByIdUser(data).subscribe(
      (response) => {
        this.lisclient = response.clienttravel;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }


  public alert(titulo: any, text: any, icon: any): void {
    Swal.fire({
      title: titulo,
      text: text,
      icon: icon,
    });
  }
}
