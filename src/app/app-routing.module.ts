import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './componentes/inicio/inicio/inicio.component'
import {InicioAdminComponent} from './componentes/administrador/inicio-admin/inicio-admin.component'
import {PerfilesComponent} from './componentes/administrador/perfiles/perfiles.component'
const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
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
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutedComponents: any[]=[
  InicioComponent
];
