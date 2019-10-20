import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoutesModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts-x';
import { ReactiveFormsModule} from '@angular/forms';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { InicioModule } from 'src/app/componentes/inicio/inicio.module';
import { AdministradorModule } from 'src/app/componentes/administrador/administrador.module';
// register 'es' locale
registerLocaleData(localeEs);
import { StorageService } from './servicios/storage.service';
import { LocalService } from 'src/app/servicios/local.service';
//import { LoginService } from 'src/app/servicios/login.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RoutesModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule.forRoot(),
    CompartidoModule,
    AdministradorModule
  ],
  providers: [
    StorageService,
    LocalService
  ],
  entryComponents: [ ],
  bootstrap: [ AppComponent],
})
export class AppModule {
  constructor() { 
   } 
}
