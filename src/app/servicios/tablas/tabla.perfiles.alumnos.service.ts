import {Injectable, PipeTransform,OnInit} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { Alumno } from 'src/app/modelos/alumno.model';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from '../sorteable.directive';
import { environment } from 'src/environments/environment';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
interface SearchResult {
  alumnos: Alumno[];
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

function sort(alumnos: Alumno[], column: string, direction: string): Alumno[] {
  for(let alumno of alumnos){
    alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alumno.id
  }
  if (direction === '') {
    return alumnos;
  } else {
    return [...alumnos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortCurso(alumnos: Alumno[], column: string, direction: string): Alumno[]{
  for(let alumno of alumnos){
    alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alumno.id
  }
  if(direction === ''){
    return alumnos;
  }
  else{
    return [...alumnos].sort((a,b) => {
      const res = compare(a.curso.nombre,b.curso.nombre);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortRut(alumnos: Alumno[], column: string, direction: string): Alumno[]{
  for(let alumno of alumnos){
    alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alumno.id
  }
  if(direction === ''){
    return alumnos;
  }
  else{
    return [...alumnos].sort((a,b) => {
      const res = compare(a.rut,b.rut);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortNombre(alumnos: Alumno[], column: string, direction: string): Alumno[]{
  for(let alumno of alumnos){
    alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alumno.id
  }
  if(direction === ''){
    return alumnos;
  }
  else{
    return [...alumnos].sort((a,b) => {
      const res = compare(a.nombres,b.nombres);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortApellidoPaterno(alumnos: Alumno[], column: string, direction: string): Alumno[]{
  for(let alumno of alumnos){
    alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alumno.id
  }
  if(direction === ''){
    return alumnos;
  }
  else{
    return [...alumnos].sort((a,b) => {
      const res = compare(a.apellido_paterno,b.apellido_paterno);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortApellidoMaterno(alumnos: Alumno[], column: string, direction: string): Alumno[]{
  for(let alumno of alumnos){
    alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alumno.id
  }
  if(direction === ''){
    return alumnos;
  }
  else{
    return [...alumnos].sort((a,b) => {
      const res = compare(a.apellido_materno,b.apellido_materno);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(alumno: Alumno, term: string, pipe: PipeTransform) {
  return  alumno.rut.toLowerCase().includes(term)
    || alumno.nombres.toLowerCase().includes(term)
    || alumno.apellido_paterno.toLowerCase().includes(term)
    || alumno.apellido_materno.toLowerCase().includes(term)
    || alumno.curso.nombre.toLowerCase().includes(term)    
}

@Injectable({providedIn: 'root'})
export class AlumnoTablaService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private alumnos: Array<Alumno>;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  token: string
  constructor(private pipe: DecimalPipe,
    private _localService: LocalService,
    private _storageService: StorageService, 
    private _alumnoService: AlumnoService) 
  {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getAlumnos()
  }

  getAlumnos(){
    this._alumnoService.getAlumno(this.token).subscribe((data: Alumno[])=>{
      this.alumnos = data
      this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._alumnos$.next(result.alumnos);
          this._total$.next(result.total);
        });
        this._search$.next();
  })
  }

  get alumnos$() { return this._alumnos$.asObservable(); }
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
    let alumnos = this.alumnos
    // 1. sort
    if(this._state.sortColumn==""){
      alumnos = sort(alumnos,sortColumn,sortDirection)
    }
    if(this._state.sortColumn=="curso"){
      alumnos = sortCurso(alumnos,sortColumn,sortDirection)
    }
    if(this._state.sortColumn=="rut"){
      alumnos = sortRut(alumnos, sortColumn, sortDirection);
    }
    if(this._state.sortColumn=="nombres"){
      alumnos = sortNombre(alumnos, sortColumn, sortDirection);
    }
    if(this._state.sortColumn=="apellido_paterno"){
      alumnos = sortApellidoPaterno(alumnos, sortColumn, sortDirection);
    }
    if(this._state.sortColumn=="apellido_materno"){
      alumnos = sortApellidoMaterno(alumnos, sortColumn, sortDirection);
    }
    
    // 2. filter
    alumnos = alumnos.filter(evento => matches(evento, searchTerm, this.pipe));
    const total = alumnos.length;
    // 3. paginate
    alumnos = alumnos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({alumnos, total});
  }
}