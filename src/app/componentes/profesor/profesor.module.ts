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

//SERVICIOS

//COMPONENTES
import { HomeComponent } from './home/home.component';
import { HeaderProfesorComponent } from './header-profesor/header-profesor.component';
import { FooterProfesorComponent } from './footer-profesor/footer-profesor.component';
const routes: Routes = [
    { path: '', component: HomeComponent }
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
        ChartsModule
    ],
    declarations: [
        HomeComponent,
        HeaderProfesorComponent,
        FooterProfesorComponent
    ],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class ProfesorModule { }
