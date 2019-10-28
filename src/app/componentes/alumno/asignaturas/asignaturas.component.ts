import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {
  asignaturas: Asignatura[]
  pageAsignatura: number;
  pageSizeAsignatura: number;
  collectionSizeAsignatura: number;
  token: string
  load=true
  constructor(
    private _asignaturaService: AsignaturaService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private router:Router
  ) {
    this.pageAsignatura = 1;
    this.pageSizeAsignatura = 4;
    this.asignaturas = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getAsignaturas()
  }

  getAsignaturas(){
    this.load=true
    this._asignaturaService.getAsignaturas(this.token).subscribe((data:Asignatura[])=>{
      this.asignaturas = data
      this.collectionSizeAsignatura = this.asignaturas.length
      this.load = false
    })
  }

  generarVistaDetalleAsignatura(id:string){
    this.router.navigateByUrl('/alumno/asignaturas/'+id+'/detalle');
  }

  get asignaturas_tabla(): any[] {
    return this.asignaturas
      .map((asignatura, i) => ({id: i + 1, ...asignatura}))
      .slice((this.pageAsignatura - 1) * this.pageSizeAsignatura, (this.pageAsignatura - 1) * this.pageSizeAsignatura + this.pageSizeAsignatura);
  }

}
