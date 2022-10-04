import { CoreComponent } from './core.component';
import { UserComponent } from './user/user.component';
import { TravelComponent } from './travel/travel.component';
import { ClientComponent } from './client/client.component';
import { CarComponent } from './car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children:[
      {
        path: 'car',
        component: CarComponent,
      },

      {
        path: 'cars',
        component: CarComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'clients',
        component: ClientComponent,
      },
      {
        path: 'client-travel',
        component: ClientComponent,
      },
      {
        path: 'travel',
        component: TravelComponent,
      },
      {
        path: 'travel-client',
        component: TravelComponent,
      },

      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
