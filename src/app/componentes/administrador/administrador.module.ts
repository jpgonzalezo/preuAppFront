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
import { MaterialModule } from 'src/app/componentes/material.module';
import { BrowserModule } from '@angular/platform-browser';
// register 'es' locale
registerLocaleData(localeEs);
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

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
import { NgbdSortableHeader } from 'src/app/servicios/sorteable.directive';
import { NuevoAlumnoComponent } from './nuevo-alumno/nuevo-alumno.component';
import { NuevoProfesorComponent } from './nuevo-profesor/nuevo-profesor.component';
import { NuevoApoderadoComponent } from './nuevo-apoderado/nuevo-apoderado.component';
import { NuevoAdministradorComponent } from './nuevo-administrador/nuevo-administrador.component';
import { NuevoColegioComponent } from './nuevo-colegio/nuevo-colegio.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { NuevaObservacionAlumnoComponent } from './nueva-observacion-alumno/nueva-observacion-alumno.component';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';
import { EditarProfesorComponent } from './editar-profesor/editar-profesor.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'perfiles', component: PerfilesComponent},
    { path: 'perfiles/nuevoAlumno', component: NuevoAlumnoComponent},
    { path: 'perfiles/nuevoProfesor', component: NuevoProfesorComponent},
    { path: 'perfiles/nuevoApoderado', component: NuevoApoderadoComponent},
    { path: 'perfiles/nuevoAdministrador', component: NuevoAdministradorComponent},
    { path: 'perfiles/editarAlumno/:id', component: EditarAlumnoComponent},
    { path: 'perfiles/editarProfesor/:id', component: EditarProfesorComponent},
    { path: 'eventos', component: TablaEventosComponent},
    { path: 'perfiles/hoja_vida/:id', component: HojaVidaComponent},
    { path: 'perfiles/hoja_vida/:id/nuevaObservacion', component: NuevaObservacionAlumnoComponent},
    { path: 'perfiles/detalle_profesor/:id', component: DetalleProfesorComponent},
    { path: 'perfiles/nuevo_perfil/:tipo_perfil', component: NuevoPerfilComponent},
    { path: 'colegios', component: ColegioComponent},
    { path: 'colegios/nuevoColegio', component: NuevoColegioComponent},
    { path: 'asistencia', component: AsistenciaComponent},
    { path: 'asistencia/nueva_asistencia', component: NuevaAsistenciaComponent},
    { path: 'asistencia/detalle_asistencia/:id', component: DetalleAsistenciaComponent},
    { path: 'asignaturas/detalle_asignatura/:id_asignatura/detalle_evaluacion/:id_evaluacion', component: DetalleEvaluacionComponent},
    { path: 'asignaturas', component: AsignaturaComponent},
    { path: 'asignaturas/detalle_asignatura/:id', component: DetalleAsignaturaComponent},
    { path: 'cursos', component: CursoComponent},
    { path: 'alertas', component: AlertasComponent},
    { path: 'cursos/detalle_curso/:id', component: DetalleCursoComponent},
    { path: 'change_password', component: CambioContrasenaComponent}
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
        MaterialModule,
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
        NgbdSortableHeader,
        CambioContrasenaComponent,
        NuevoAlumnoComponent,
        NuevoProfesorComponent,
        NuevoApoderadoComponent,
        NuevoAdministradorComponent,
        NuevoColegioComponent,
        NuevaObservacionAlumnoComponent,
        EditarAlumnoComponent,
        EditarProfesorComponent
    ],
    exports: [
        RouterModule
    ],
    //En los providers va los servicios que utiliza el modulo
    providers:[
    ]
})
export class AdministradorModule { }
