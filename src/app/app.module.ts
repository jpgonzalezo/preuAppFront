import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PerfilUsuarioComponent } from './componentes/admin/perfil-usuario/perfil-usuario.component';
import { ListaAlumnosComponent } from './componentes/admin/lista-alumnos/lista-alumnos.component';
import { MenuAdminComponent } from './componentes/admin/menu-admin/menu-admin.component';
import { FooterComponent } from './componentes/admin/footer/footer.component';
import { InicioAdminComponent } from './componentes/admin/inicio-admin/inicio-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    ListaAlumnosComponent,
    MenuAdminComponent,
    FooterComponent,
    InicioAdminComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
