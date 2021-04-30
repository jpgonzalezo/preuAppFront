import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizatedGuard, AuthorizatedGuardProfesor, AuthorizatedGuardAlumno, AuthorizatedGuardApoderado } from 'src/app/componentes/authorizated.guard';
//SERVICIOS
import { LoginService } from 'src/app/servicios/login.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { JustificacionService } from 'src/app/servicios/justificacion.service';
import { AnotacionService } from 'src/app/servicios/anotacion.service';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { PruebaService } from 'src/app/servicios/prueba.service';
import {  TopicoService } from 'src/app/servicios/topico.service';
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
import { EventoService } from 'src/app/servicios/evento.service';
import { AlertaTablaService } from 'src/app/servicios/tablas/tabla.alerta.service';
import { SolicitudEventoTablaService } from 'src/app/servicios/tablas/tabla.solicitudes.service';
import { AlumnoTablaService } from 'src/app/servicios/tablas/tabla.perfiles.alumnos.service';
import { DecimalPipe } from '@angular/common';
import { ObservacionService } from 'src/app/servicios/observacion.service';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { VideoService } from 'src/app/servicios/video.service';
import { ArchivoService } from 'src/app/servicios/archivo.service';
import { PreguntaService } from 'src/app/servicios/pregunta.service';

@NgModule({
    declarations: [

    ],
    imports: [HttpClientModule],
    providers:[
        LoginService, 
        StorageService, 
        AuthorizatedGuard,
        AuthorizatedGuardProfesor,
        AuthorizatedGuardAlumno,
        AuthorizatedGuardApoderado,
        ProfesorService,
        AsignaturaService,
        AsistenciaService,
        JustificacionService,
        AnotacionService,
        AlertaService,
        AlumnoService,
        PruebaService,
        TopicoService,
        EvaluacionService,
        EventoService,
        DecimalPipe,
        AlertaTablaService,
        SolicitudEventoTablaService,
        AlumnoTablaService,
        ObservacionService,
        ColegioService,
        CursoService,
        ApoderadoService,
        AdministradorService,
        VideoService,
        ArchivoService,
        PreguntaService
    ]

})
export class CompartidoModule { }