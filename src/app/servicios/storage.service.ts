import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {Session} from "../modelos/session.model";
@Injectable()
export class StorageService {
  private localStorageService;
  private sesionActual : Session = null;
  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.sesionActual = this.loadSessionData();
  }
  setCurrentSession(session: Session): void {
    this.sesionActual = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }
  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }
  getCurrentSession(): Session {
    return this.sesionActual;
  }
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.sesionActual = null;
  }
  getCurrentUser(){
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticatedAdmin(): boolean{
    if (this.getCurrentUser()['tipo'] == 'ADMINISTRADOR') {
      return true
    }
    else{
      return false
    }
  }
  isAuthenticatedProfesor(): boolean{
    if (this.getCurrentUser()['tipo'] == 'PROFESOR') {
      return true
    }
    else{
      return false
    }
  }
  isAuthenticatedAlumno(): boolean{
    if (this.getCurrentUser()['tipo'] == 'ALUMNO') {
      return true
    }
    else{
      return false
    }
  }
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/inicio']);
  }
}