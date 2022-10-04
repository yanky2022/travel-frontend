import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './auth/guards/authentication.guard';


const routes: Routes = [
  {
    path:'',
    redirectTo:'loguin',
    pathMatch:'full'
  },
  {
    path:'loguin',
    loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path:'dashboard',
    canActivate:[AuthenticationGuard],
    loadChildren:()=>import('./core/core.module').then((m)=>m.CoreModule)
  },
  {
    path: '**',
    redirectTo: 'loguin',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
