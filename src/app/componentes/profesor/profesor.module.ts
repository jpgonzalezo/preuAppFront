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
import { Ng2Rut } from 'ng2-rut';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AgGridModule } from 'ag-grid-angular';
// register 'es' locale
registerLocaleData(localeEs);

//SERVICIOS

//COMPONENTES
import { HomeComponent } from './home/home.component';
import { HeaderProfesorComponent } from './header-profesor/header-profesor.component';
import { FooterProfesorComponent } from './footer-profesor/footer-profesor.component';
import { AsignaturaComponent } from './asignatura/asignatura.component';
import { DetalleEvaluacionComponent } from './detalle-evaluacion/detalle-evaluacion.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { RegistrarEvaluacionComponent } from './registrar-evaluacion/registrar-evaluacion.component';
import { EditarEvaluacionComponent } from './editar-evaluacion/editar-evaluacion.component';
import { ListadoSolicitudEventosComponent } from './listado-solicitud-eventos/listado-solicitud-eventos.component';
import { CursosComponent } from './cursos/cursos.component';
const routes: Routes = [
    { path: '', component: AsignaturaComponent },
    { path: 'calendario', component: CalendarioComponent},
    { path: 'eventos', component: ListadoSolicitudEventosComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'detalle/evaluacion/:id', component: DetalleEvaluacionComponent},
    { path: 'detalle/evaluacion/:id/registrar/curso/:id_curso', component: RegistrarEvaluacionComponent},
    { path: 'detalle/evaluacion/:id/editar', component: EditarEvaluacionComponent}
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
        FullCalendarModule,
        Ng2Rut,
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
        HeaderProfesorComponent,
        FooterProfesorComponent,
        AsignaturaComponent,
        DetalleEvaluacionComponent,
        CalendarioComponent,
        RegistrarEvaluacionComponent,
        EditarEvaluacionComponent,
        ListadoSolicitudEventosComponent,
        CursosComponent
    ],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class ProfesorModule { }
