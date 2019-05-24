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
        AnotacionService
    ]
})
export class CompartidoModule { }