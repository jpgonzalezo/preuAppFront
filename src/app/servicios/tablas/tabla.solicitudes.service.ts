import {Injectable, PipeTransform,OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { Evento } from 'src/app/modelos/evento.model';
import { EventoService } from 'src/app/servicios/evento.service';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { SortDirection } from '../sorteable.directive';
import { Config } from 'src/app/config';

interface SearchResult {
  eventos: Evento[];
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

function sort(eventos: Evento[], column: string, direction: string): Evento[] {
  if (direction === '') {
    return eventos;
  } else {
    return [...eventos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortCurso(eventos: Evento[], column: string, direction: string): Evento[]{
  if(direction === ''){
    return eventos;
  }
  else{
    return [...eventos].sort((a,b) => {
      const res = compare(a.curso.nombre,b.curso.nombre);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortTitle(eventos: Evento[], column: string, direction: string): Evento[]{
  if(direction === ''){
    return eventos;
  }
  else{
    return [...eventos].sort((a,b) => {
      const res = compare(a.title,b.title);
      return direction === 'asc' ? res : -res;
    });
  }
}

function sortStart(eventos: Evento[], column: string, direction: string): Evento[]{
  if(direction === ''){
    return eventos;
  }
  else{
    return [...eventos].sort((a,b) => {
      const res = compare(a.start,b.start);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(evento: Evento, term: string, pipe: PipeTransform) {
  return  evento.start.toLowerCase().includes(term)
    ||evento.title.toLowerCase().includes(term)
    || evento.curso.nombre.toLowerCase().includes(term)    
}

@Injectable({providedIn: 'root'})
export class SolicitudEventoTablaService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _eventos$ = new BehaviorSubject<Evento[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private eventos: Array<Evento>;
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private _eventoService: EventoService) {
    this.getEventos()
  }

  getEventos(){
    this._eventoService.getSolicitudesEventos().subscribe((data: Evento[])=>{
      this.eventos = data
      this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._eventos$.next(result.eventos);
          this._total$.next(result.total);
        });
        this._search$.next();
  })
  }

  get eventos$() { return this._eventos$.asObservable(); }
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
    let eventos = this.eventos
    // 1. sort
    if(this._state.sortColumn==""){
      eventos = sort(eventos,sortColumn,sortDirection)
    }
    if(this._state.sortColumn=="curso"){
      eventos = sortCurso(eventos,sortColumn,sortDirection)
    }
    if(this._state.sortColumn=="title"){
      eventos = sortTitle(eventos, sortColumn, sortDirection);
    }
    if(this._state.sortColumn=="start"){
      eventos = sortStart(eventos, sortColumn, sortDirection);
    }
    
    // 2. filter
    eventos = eventos.filter(evento => matches(evento, searchTerm, this.pipe));
    const total = eventos.length;
    // 3. paginate
    eventos = eventos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({eventos, total});
  }
}