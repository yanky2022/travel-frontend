import { ClienteService } from './../services/cliente.service';
import { TravelService } from '../services/travel.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { withDebugTracing } from '@angular/router';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent implements OnInit {
  public listravel: any;
  public lisTravelOutAssigne: any;
  public lisTravelOutAssigneT: any;

  formTravel: FormGroup = this.formBuilder.group({
    _id: [''],
    starting_point: ['', Validators.required],
    final_point: ['', Validators.required],
    race_price: ['', Validators.required],
    id_client: [''],
    id_user: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private travelService: TravelService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.getTravelsOutAssigne();
    this.getTravelsOutAssigneT();
    this.clientsByIdTravel();
  }

  public createTravel(): void {
    if (this.formTravel.valid) {
      const data = this.formTravel.value;
      if (data.id_client === '') {
        return this.alert(
          'Creacion Viaje',
          'error en el formulario por favor dar clic en el boton asignar',
          'error'
        );
      }
      data.id_user = sessionStorage.getItem('id');
      this.travelService.createTravel(data).subscribe((data) => {
        if (data) {
          this.getTravelsOutAssigne();
          this.getTravelsOutAssigneT();
          this.clientsByIdTravel();
          this.formTravel.reset();
          this.alert('Creacion Viaje', data.message, 'info');
        } else {
          this.alert(
            'Error al crear el viaje',
            'Error al guardar el viaje',
            'error'
          );
        }
      });
    } else {
      this.alert('Error al crear viaje', 'Validar datos ingresados', 'error');
    }
  }

  public assigneTravel(travel: any): void {
    this.formTravel.get('starting_point')?.setValue(travel.starting_point);
    this.formTravel.get('final_point')?.setValue(travel.final_point);
    this.formTravel.get('id_client')?.setValue(travel._id);
  }

  public getTravelsOutAssigne(): void {
    this.clienteService.clientByStatus({ status: false }).subscribe(
      (response) => {
        this.lisTravelOutAssigne = response.clients;
      },
      (error) => {
        this.alert('Error ', error, 'error');
      }
    );
  }
  public getTravelsOutAssigneT(): void {
    this.clienteService.clientByStatus({ status: true }).subscribe(
      (response) => {
        this.lisTravelOutAssigneT = response.clients;
      },
      (error) => {
        this.alert('Error ', error, 'error');
      }
    );
  }
  public clientsByIdTravel(): void {
    const data = { idUser: sessionStorage.getItem('id') };
    this.travelService.clientsByIdTravel(data).subscribe(
      (response) => {
        this.lisTravelOutAssigneT = response.travelclient;
        console.log(this.lisTravelOutAssigneT);
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
