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
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule} from '@angular/forms';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { InicioModule } from 'src/app/componentes/inicio/inicio.module';
// register 'es' locale
registerLocaleData(localeEs);
import { StorageService } from './servicios/storage.service';
//import { LoginService } from 'src/app/servicios/login.service';

@NgModule({
  declarations: [
    AppComponent,
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
    NgbModule,
    CompartidoModule,
    InicioModule
  ],
  providers: [
    StorageService,
  ],
  entryComponents: [ ],
  bootstrap: [ AppComponent],
})
export class AppModule {
  constructor() { 
   } 
}
