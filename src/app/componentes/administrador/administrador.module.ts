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
import { InicioAdminComponent } from './inicio-admin/inicio-admin.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { HojaVidaComponent } from './hoja-vida/hoja-vida.component';
import { NuevoPerfilComponent } from './nuevo-perfil/nuevo-perfil.component';
//SERVICIOS
import { EstadisticaService } from 'src/app/servicios/estadistica.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { AlumnoService } from 'src/app/servicios/alumno.service';
const routes: Routes = [
    { path: '', component: InicioAdminComponent },
    { path: 'perfiles', component: PerfilesComponent}
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
        InicioAdminComponent,
        PerfilesComponent],
    exports: [
        RouterModule
    ],
    providers:[
        EstadisticaService,
        CursoService,
        AlumnoService
    ]
})
export class AdministradorModule { }
