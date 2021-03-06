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
import { FullCalendarModule } from '@fullcalendar/angular';
import { Ng2Rut } from 'ng2-rut';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
// register 'es' locale
registerLocaleData(localeEs);
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
//SERVICIOS
import { AdministradorCompartidoService } from './administrador.compartido.service';
import { EstadisticaService } from 'src/app/servicios/estadistica.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { ObservacionService } from 'src/app/servicios/observacion.service';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';
import { AdministradorService } from 'src/app/servicios/administrador.service';
//COMPONENTES
import { HomeComponent } from './home/home.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { HojaVidaComponent } from './hoja-vida/hoja-vida.component';
import { NuevoPerfilComponent } from './nuevo-perfil/nuevo-perfil.component';
import { HeadersComponent } from './headers/headers.component';
import { FooterComponent } from './footer/footer.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { CursoComponent } from './curso/curso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { PuntajeComponent } from './puntaje/puntaje.component';
import { ColegioComponent } from './colegio/colegio.component';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { AsignaturaComponent } from './asignatura/asignatura.component';
import { DetalleAsignaturaComponent } from './detalle-asignatura/detalle-asignatura.component';
import { NuevaAsistenciaComponent } from './nueva-asistencia/nueva-asistencia.component';
import { DetalleAsistenciaComponent } from './detalle-asistencia/detalle-asistencia.component';
import { DetalleProfesorComponent } from './detalle-profesor/detalle-profesor.component';
import { DetalleEvaluacionComponent } from './detalle-evaluacion/detalle-evaluacion.component';
import { TablaEventosComponent } from './tabla-eventos/tabla-eventos.component';
import { AlertasComponent } from './alertas/alertas.component';








import { BrowserModule } from '@angular/platform-browser';
import { NgbdSortableHeader } from 'src/app/servicios/sorteable.directive';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'perfiles', component: PerfilesComponent},
    { path: 'eventos', component: TablaEventosComponent},
    { path: 'perfiles/hoja_vida/:id', component: HojaVidaComponent},
    { path: 'perfiles/detalle_profesor/:id', component: DetalleProfesorComponent},
    { path: 'perfiles/nuevo_perfil/:tipo_perfil', component: NuevoPerfilComponent},
    { path: 'colegios', component: ColegioComponent},
    { path: 'asistencia', component: AsistenciaComponent},
    { path: 'asistencia/nueva_asistencia', component: NuevaAsistenciaComponent},
    { path: 'asistencia/detalle_asistencia/:id', component: DetalleAsistenciaComponent},
    { path: 'asignaturas/detalle_asignatura/:id_asignatura/detalle_evaluacion/:id_evaluacion', component: DetalleEvaluacionComponent},
    { path: 'asignaturas', component: AsignaturaComponent},
    { path: 'asignaturas/detalle_asignatura/:id', component: DetalleAsignaturaComponent},
    { path: 'cursos', component: CursoComponent},
    { path: 'alertas', component: AlertasComponent},
    { path: 'cursos/detalle_curso/:id', component: DetalleCursoComponent}
];

@NgModule({
    //en los imports van los modulos que utiliza este modulo
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
        CompartidoModule,
        NgxLoadingModule.forRoot({  
            animationType: ngxLoadingAnimationTypes.circleSwish,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff', 
            secondaryColour: '#ffffff', 
            tertiaryColour: '#ffffff'
        })
    ],
    //en declarations van los componentes que utiliza el modulo
    declarations: [
        HomeComponent,
        PerfilesComponent,
        HeadersComponent,
        FooterComponent,
        HojaVidaComponent,
        NuevoPerfilComponent,
        AsistenciaComponent,
        CursoComponent,
        EstadisticaComponent,
        PuntajeComponent,
        ColegioComponent,
        DetalleCursoComponent,
        AsignaturaComponent,
        DetalleAsignaturaComponent,
        NuevaAsistenciaComponent,
        DetalleAsistenciaComponent,
        DetalleProfesorComponent,
        DetalleEvaluacionComponent,
        TablaEventosComponent,
        AlertasComponent,
        NgbdSortableHeader
    ],
    exports: [
        RouterModule
    ],
    //En los providers va los servicios que utiliza el modulo
    providers:[
    ]
})
export class AdministradorModule { }
