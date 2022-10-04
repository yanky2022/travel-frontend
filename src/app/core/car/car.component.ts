import { CarService } from './../services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { withDebugTracing } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  public liscar: any;
  public lisuser: any;
  public flatEdit = false;
  public profile: string | null = ''


  formCar: FormGroup = this.formBuilder.group({
    _id: [''],
    ability: ['', Validators.required],
    cylinder_capacity: ['', Validators.required],
    soat_date: ['', Validators.required],
    operation_card_date: ['', Validators.required],
    license_plate: ['', Validators.required],
    owner: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCars();
    this.queryUserByProfile()
    this.profile = sessionStorage.getItem('profile')
  }

  public createCar(): void {
    console.log(this.formCar.value);
    if (this.formCar.valid) {
      const data = this.formCar.value;
      this.carService.createCar(data).subscribe((data) => {
        if (data) {
          this.formCar.reset();
          this.getCars();
          this.alert('Creacion de Vehiculo', data.message, 'info');
        } else {
          this.alert(
            'Error al crear el Vehiculo',
            'Error al guardar el Vehiculo',
            'error'
          );
        }
      });
    } else {
      this.alert(
        'Error al crear Vehiculo',
        'Validar datos ingresados',
        'error'
      );
    }
  }

  public editCar(car: any): void {
    this.flatEdit = true;
    this.formCar.patchValue(car);
  }

  public updateCar(): void {
    if (this.formCar.valid) {
      const data = this.formCar.value;
      this.carService.updateCar(data).subscribe((data) => {
        if (data) {
          this.formCar.reset();
          this.getCars();
          this.flatEdit = false;
          this.alert('Actualizacion de Vehiculo', data.message, 'info');
        } else {
          this.alert(
            'Error al Actualizar el Vehiculo',
            'Error al Actualizar el Vehiculo',
            'error'
          );
        }
      });
    } else {
      this.alert(
        'Error al Actualizar Vehiculo',
        'Validar datos ingresados',
        'error'
      );
    }
  }

  public deleteCar(car: any): void {
    this.carService.deleteCar(car._id).subscribe((response) => {
      if (response) {
        this.getCars();
        this.alert('Eliminacion de  Vehiculo', response.message, 'info');
      } else {
        this.alert(
          'Error al Eliminar el Vehiculo',
          'Error al Eliminar el Vehiculo',
          'error'
        );
      }
    });
  }
  public getCars(): void {
    this.carService.getCars().subscribe(
      (response) => {
        this.liscar = response.cars;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  public queryUserByProfile(): void {
    this.userService.queryUserByProfile().subscribe(
      (response) => {
        this.lisuser = response.users;
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
