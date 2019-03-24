import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotTableModule } from '@handsontable/angular';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AlumnoService} from './servicios/alumno.service'

// register 'es' locale
registerLocaleData(localeEs);

import { AppRoutingModule, RoutedComponents } from './app-routing.module';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';
/* any other core modules */
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { AppComponent } from './app.component';
import { InicioAdminComponent } from './componentes/administrador/inicio-admin/inicio-admin.component';
import { PerfilesComponent } from './componentes/administrador/perfiles/perfiles.component';
import { HomeComponent } from './componentes/administrador/home/home.component';
import { CursoComponent } from './componentes/administrador/curso/curso.component';
import { PuntajeComponent } from './componentes/administrador/puntaje/puntaje.component';
import { AsistenciaComponent } from './componentes/administrador/asistencia/asistencia.component';
import { EstadisticaComponent } from './componentes/administrador/estadistica/estadistica.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule} from '@angular/forms';
import { HojaVidaComponent } from './componentes/administrador/hoja-vida/hoja-vida.component';

//COMPONENTES INICIO
import { InicioComponent } from './componentes/inicio/inicio/inicio.component';
import { SliderComponent } from './componentes/inicio/slider/slider.component';
import { NosotrosComponent } from './componentes/inicio/nosotros/nosotros.component';
import { ServiciosComponent } from './componentes/inicio/servicios/servicios.component';
import { CursosPaginaPrincipalComponent } from './componentes/inicio/cursos-pagina-principal/cursos-pagina-principal.component';
import { FooterComponent } from './componentes/inicio/footer/footer.component';
import { LoginComponent } from './componentes/inicio/login/login.component';


import {LoginService} from './servicios/login.service';
import { ColegioService } from './servicios/colegio.service';
import { ApoderadoService} from './servicios/apoderado.service';
import {CursoService} from './servicios/curso.service';
import {EstadisticaService} from './servicios/estadistica.service';
import { NuevoPerfilComponent } from './componentes/administrador/nuevo-perfil/nuevo-perfil.component'
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    SliderComponent,
    NosotrosComponent,
    ServiciosComponent,
    CursosPaginaPrincipalComponent,
    RoutedComponents,
    InicioAdminComponent,
    PerfilesComponent,
    HomeComponent,
    CursoComponent,
    PuntajeComponent,
    AsistenciaComponent,
    EstadisticaComponent,
    HojaVidaComponent,
    LoginComponent,
    NuevoPerfilComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    /** Covalent Modules */
    CovalentLayoutModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentStepsModule,
    /**Chart Moule para graficos */
    ChartsModule,
    HotTableModule,
    NgbModule
  ], // modules needed to run this module
  providers: [
    AlumnoService,
    LoginService,
    EstadisticaService,
    ColegioService,
    ApoderadoService,
    CursoService
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent],
})
export class AppModule {}
