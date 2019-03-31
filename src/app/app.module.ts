import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoutesModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule} from '@angular/forms';
// register 'es' locale
registerLocaleData(localeEs);


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
    RoutesModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule
  ],
  providers: [
  ],
  entryComponents: [ ],
  bootstrap: [ AppComponent],
})
export class AppModule {}
