import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// register 'es' locale
registerLocaleData(localeEs);

import { MainComponent } from './componentes/main/main.component';
import { AppRoutingModule, RoutedComponents } from './app-routing.module';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';
/* any other core modules */
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { AppComponent } from './app.component';
import { InicioAdminComponent } from './componentes/administrador/inicio-admin/inicio-admin.component';
import { PerfilesComponent } from './componentes/administrador/perfiles/perfiles.component';
import { HomeComponent } from './componentes/administrador/home/home.component';
import { CursoComponent } from './componentes/administrador/curso/curso.component';
import { PuntajeComponent } from './componentes/administrador/puntaje/puntaje.component';
import { AsistenciaComponent } from './componentes/administrador/asistencia/asistencia.component';
import { EstadisticaComponent } from './componentes/administrador/estadistica/estadistica.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MatTableModule } from  '@angular/material';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RoutedComponents,
    InicioAdminComponent,
    PerfilesComponent,
    HomeComponent,
    CursoComponent,
    PuntajeComponent,
    AsistenciaComponent,
    EstadisticaComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    /** Covalent Modules */
    CovalentLayoutModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentStepsModule,
    /**Chart Moule para graficos */
    ChartsModule,
    /**MatTableModule para tablas */
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule
  ], // modules needed to run this module
  providers: [
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent],
})
export class AppModule {}
