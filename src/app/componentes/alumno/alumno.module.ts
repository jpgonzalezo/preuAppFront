import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule} from '@angular/forms';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { Ng2Rut } from 'ng2-rut';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/componentes/material.module';
// register 'es' locale
registerLocaleData(localeEs);

//SERVICIOS

//COMPONENTES
import { HomeComponent } from './home/home.component';
import { HeaderAlumnoComponent } from './header-alumno/header-alumno.component';
import { FooterAlumnoComponent } from './footer-alumno/footer-alumno.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { DetalleAsignaturaComponent } from './detalle-asignatura/detalle-asignatura.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { HojaRespuestaComponent } from './hoja-respuesta/hoja-respuesta.component';
import { NuevaObservacionProfesorComponent } from './nueva-observacion-profesor/nueva-observacion-profesor.component';
import { VideoAlumnoComponent } from './video-alumno/video-alumno.component';

const routes: Routes = [
    { path: '', redirectTo: 'calendario', pathMatch: 'full' },
    { path: 'perfil', component: HomeComponent },
    { path: 'calendario', component: CalendarioComponent },
    { path: 'asignaturas', component: AsignaturasComponent },
    { path: 'asignaturas/:id/detalle', component: DetalleAsignaturaComponent },
    { path: 'asignaturas/:id/detalle/profesor/:id_profesor/nuevaObservacion', component: NuevaObservacionProfesorComponent },
    { path: 'asignaturas/:id/detalle/evaluacion/:id_prueba/hojaRespuesta', component: HojaRespuestaComponent },
    { path: 'change_password', component: CambioContrasenaComponent }
];

@NgModule({
    imports: [
        ChartsModule,
        NgbModule.forRoot(),
        NgbPaginationModule,
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        CompartidoModule,
        ReactiveFormsModule,
        FullCalendarModule,
        Ng2Rut,
        MaterialModule,
        AgGridModule.withComponents([]),
        NgxLoadingModule.forRoot({  
            animationType: ngxLoadingAnimationTypes.circleSwish,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff', 
            secondaryColour: '#ffffff', 
            tertiaryColour: '#ffffff'
        })
    ],
    declarations: [
        HomeComponent,
        HeaderAlumnoComponent,
        FooterAlumnoComponent,
        CalendarioComponent,
        AsignaturasComponent,
        DetalleAsignaturaComponent,
        HojaRespuestaComponent,
        CambioContrasenaComponent,
        NuevaObservacionProfesorComponent,
        VideoAlumnoComponent
    ],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class AlumnoModule { }
