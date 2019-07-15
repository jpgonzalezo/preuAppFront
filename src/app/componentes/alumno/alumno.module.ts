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
// register 'es' locale
registerLocaleData(localeEs);

//SERVICIOS

//COMPONENTES
import { HomeComponent } from './home/home.component';
import { HeaderAlumnoComponent } from './header-alumno/header-alumno.component';
import { FooterAlumnoComponent } from './footer-alumno/footer-alumno.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
const routes: Routes = [
    { path: '', component: HomeComponent },
    //ng g c nombreComponente
    //ng g m nombreModulo
    //agregar path aqui
    { path: 'perfil', component: MiPerfilComponent}
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
        CompartidoModule
    ],
    declarations: [
        HomeComponent,
        HeaderAlumnoComponent,
        FooterAlumnoComponent,
        MiPerfilComponent
    ],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class AlumnoModule { }
