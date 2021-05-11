import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts-x';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/componentes/material.module';
registerLocaleData(localeEs);
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

//COMPONENTES
import { InicioComponent } from './inicio/inicio.component';
//SERVICIOS
import { LoginService } from 'src/app/servicios/login.service';
import { CambiaContrasenaComponent } from './cambia-contrasena/cambia-contrasena.component';
const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'cambiaPass', component: CambiaContrasenaComponent },
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
    declarations: [
        InicioComponent,
        CambiaContrasenaComponent,
    ],
    exports: [
        RouterModule
    ],
    providers:[
        LoginService
    ]
})
export class InicioModule { }