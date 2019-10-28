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
import { InicioComponent } from './inicio/inicio.component';
import { HeaderApoderadoComponent } from './header-apoderado/header-apoderado.component';
import { FooterApoderadoComponent } from './footer-apoderado/footer-apoderado.component';
registerLocaleData(localeEs);

const routes: Routes = [
    { path: '', component: InicioComponent },
    //{ path: 'calendario', component: CalendarioComponent },
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
    InicioComponent,
    HeaderApoderadoComponent,
    FooterApoderadoComponent],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class ApoderadoModule { }