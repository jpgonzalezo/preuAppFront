import {Injectable, PipeTransform,OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Alerta} from 'src/app/modelos/alerta.model';
import { AlertaService } from 'src/app/servicios/alerta.service';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../sorteable.directive';
import { environment } from 'src/environments/environment';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
interface SearchResult {
  alertas: Array<Alerta>;
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(alertas: Alerta[], column: string, direction: string): Array<Alerta> {
  for(let alerta of alertas){
    alerta.alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alerta.alumno.id
  }
  if (direction === '') {
    return alertas;
  } else {
    return [...alertas].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortAsignatura(alertas: Alerta[], column: string, direction: string): Alerta[]{
  for(let alerta of alertas){
    alerta.alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alerta.alumno.id
  }
  if(direction === ''){
    return alertas;
  }
  else{
    return [...alertas].sort((a,b) => {
      const res = compare(a.asignatura.nombre,b.asignatura.nombre);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortAlumno(alertas: Alerta[], column: string, direction: string): Alerta[]{
  for(let alerta of alertas){
    alerta.alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alerta.alumno.id
  }
  if(direction === ''){
    return alertas;
  }
  else{
    return [...alertas].sort((a,b) => {
      const res = compare(a.alumno.nombres,b.alumno.nombres);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortCurso(alertas: Alerta[], column: string, direction: string): Alerta[]{
  for(let alerta of alertas){
    alerta.alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alerta.alumno.id
  }
  if(direction === ''){
    return alertas;
  }
  else{
    return [...alertas].sort((a,b) => {
      const res = compare(a.alumno.curso.nombre,b.alumno.curso.nombre);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(alerta: Alerta, term: string, pipe: PipeTransform) {
  return  alerta.fecha.toLowerCase().includes(term)
    ||alerta.alumno.nombres.toLowerCase().includes(term)
    || alerta.alumno.apellido_paterno.toLowerCase().includes(term)
    || alerta.alumno.apellido_materno.toLowerCase().includes(term) 
    || alerta.asignatura.nombre.toLowerCase().includes(term)
    || alerta.alumno.curso.nombre.toLowerCase().includes(term)
    || alerta.tipo.toLowerCase().includes(term)
    
}

@Injectable({providedIn: 'root'})
export class AlertaTablaService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _alertas$ = new BehaviorSubject<Alerta[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private alertas: Array<Alerta>;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  token: string
  constructor(
    private _localService: LocalService,
    private _storageService: StorageService,
    private pipe: DecimalPipe, 
    private _alertaService: AlertaService) 
  {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this._alertaService.getAlertas(this.token).subscribe((data: Alerta[])=>{
        this.alertas = data
        for(let alerta of this.alertas){
          alerta.alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alerta.alumno.id
        }
        this._search$.pipe(
            tap(()=>this.getAlertas()),
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
          ).subscribe(result => {
            this.getAlertas()
            this._alertas$.next(result.alertas);
            this._total$.next(result.total);
          });
          this._search$.next();
    })

  }
  ngOnInit(){
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
  }
  getAlertas(){
    this._alertaService.getAlertas(this.token).subscribe((data: Alerta[])=>{
        this.alertas = data
    })
  }

  get alertas$() { return this._alertas$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    let alertas = this.alertas
    // 1. sort
    if(this._state.sortColumn==""){
      alertas = sort(alertas, sortColumn, sortDirection);
    }

    if(this._state.sortColumn=="asignatura"){
      alertas = sortAsignatura(alertas,sortColumn,sortDirection)
    }

    if(this._state.sortColumn=="alumno"){
      alertas = sortAlumno(alertas,sortColumn,sortDirection)
    }

    if(this._state.sortColumn=="curso"){
      alertas = sortCurso(alertas,sortColumn,sortDirection)
    }
    
    // 2. filter
    alertas = alertas.filter(alerta => matches(alerta, searchTerm, this.pipe));
    const total = alertas.length;
    // 3. paginate
    alertas = alertas.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({alertas, total});
  }
}
