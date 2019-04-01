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
// register 'es' locale
registerLocaleData(localeEs);


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
//SERVICIOS
import { AdministradorCompartidoService } from './administrador.compartido.service';
import { EstadisticaService } from 'src/app/servicios/estadistica.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { ObservacionService } from 'src/app/servicios/observacion.service';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'perfiles', component: PerfilesComponent},
    { path: 'perfiles/hoja_vida/:id', component: HojaVidaComponent},
    { path: 'perfiles/nuevo_perfil/:tipo_perfil', component: NuevoPerfilComponent},
];

@NgModule({
    imports: [
        ChartsModule,
        NgbModule,
        NgbPaginationModule,
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ChartsModule,
        NgbModule
    ],
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
        PuntajeComponent
    ],
    exports: [
        RouterModule
    ],
    providers:[
        AdministradorCompartidoService,
        EstadisticaService,
        CursoService,
        AlumnoService,
        ObservacionService,
        ColegioService,
        ApoderadoService
    ]
})
export class AdministradorModule { }
