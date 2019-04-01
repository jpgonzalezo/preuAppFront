import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizatedGuard } from 'src/app/componentes/authorizated.guard';
//SERVICIOS
import { LoginService } from 'src/app/servicios/login.service';
import { StorageService } from 'src/app/servicios/storage.service';

@NgModule({
    imports: [HttpClientModule],
    providers:[LoginService, StorageService, AuthorizatedGuard]
})
export class CompartidoModule { }