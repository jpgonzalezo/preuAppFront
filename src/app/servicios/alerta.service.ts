import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class AlertaService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient, private http: Http) { }

    getAlertas(token:string){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token});
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/alertas`).pipe(map(res => res))
    }

	getAlerta(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/alertas/${id}`,options).pipe(map(res => res))
	}

    getAlertasCurso(id:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas_curso/${id}`,options).pipe(map(res => res))
    }

    getAlertasAlumno(id:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token  });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas_alumno/${id}`,options).pipe(map(res => res))
    }

    getAlertasAsignatura(id:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas_asignatura/${id}`,options).pipe(map(res => res))
    }

    getAlertasAsignaturaToken(token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas/asignatura`,options).pipe(map(res => res))
    }

    getGraficoAlertasCursos(token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas/grafico/cursos`,options).pipe(map(res => res))
    }
}