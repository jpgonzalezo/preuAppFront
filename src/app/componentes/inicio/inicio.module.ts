import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule} from '@angular/forms';
// register 'es' locale
registerLocaleData(localeEs);


//COMPONENTES
import { InicioComponent } from './inicio/inicio.component';
//SERVICIOS
//import { LoginService } from 'src/app/servicios/login.service';
const routes: Routes = [
    { path: '', component: InicioComponent },
];

@NgModule({
    imports: [
        ChartsModule,
        NgbModule,
        NgbPaginationModule,
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
    ],
    declarations: [
        InicioComponent,
    ],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class InicioModule { }