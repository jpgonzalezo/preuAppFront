import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizatedGuard, AuthorizatedGuardProfesor } from 'src/app/componentes/authorizated.guard';
//SERVICIOS
import { LoginService } from 'src/app/servicios/login.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { JustificacionService } from 'src/app/servicios/justificacion.service';
import { AnotacionService } from 'src/app/servicios/anotacion.service';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { PruebaService } from 'src/app/servicios/prueba.service';
import {  TopicoService } from 'src/app/servicios/topico.service';
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
@NgModule({
    imports: [HttpClientModule],
    providers:[
        LoginService, 
        StorageService, 
        AuthorizatedGuard,
        AuthorizatedGuardProfesor,
        ProfesorService,
        AsignaturaService,
        AsistenciaService,
        JustificacionService,
        AnotacionService,
        AlertaService,
        PruebaService,
        TopicoService,
        EvaluacionService
    ]
})
export class CompartidoModule { }