import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './componentes/main/main.component';
import {InicioAdminComponent} from './componentes/administrador/inicio-admin/inicio-admin.component'
import {PerfilesComponent} from './componentes/administrador/perfiles/perfiles.component'
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'admin',
    component: InicioAdminComponent,
    children:[
      {
        path: 'perfiles',
        component: PerfilesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutedComponents: any[]=[
  MainComponent
];
