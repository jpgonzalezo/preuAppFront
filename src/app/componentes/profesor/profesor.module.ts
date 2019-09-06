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
// register 'es' locale
registerLocaleData(localeEs);

//SERVICIOS

//COMPONENTES
import { HomeComponent } from './home/home.component';
import { HeaderProfesorComponent } from './header-profesor/header-profesor.component';
import { FooterProfesorComponent } from './footer-profesor/footer-profesor.component';
import { AsignaturaComponent } from './asignatura/asignatura.component';
import { DetalleEvaluacionComponent } from './detalle-evaluacion/detalle-evaluacion.component';
const routes: Routes = [
    { path: '', component: AsignaturaComponent },
    { path: 'calendario', component: HomeComponent},
    { path: 'detalle/evaluacion/:id', component: DetalleEvaluacionComponent}
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
        Ng2Rut
    ],
    declarations: [
        HomeComponent,
        HeaderProfesorComponent,
        FooterProfesorComponent,
        AsignaturaComponent,
        DetalleEvaluacionComponent
    ],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class ProfesorModule { }
