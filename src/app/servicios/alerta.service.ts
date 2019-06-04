import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class AlertaService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getAlertas(){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/alertas`,options).pipe(map(res => res))
    }

	getAlerta(id:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/alertas/${id}`,options).pipe(map(res => res))
	}

    getAlertasCurso(id:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas_curso/${id}`,options).pipe(map(res => res))
    }

    getAlertasAlumno(id:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas_alumno/${id}`,options).pipe(map(res => res))
    }

    getAlertasAsignatura(id:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas_asignatura/${id}`,options).pipe(map(res => res))
    }

    getGraficoAlertasCursos(){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/alertas/grafico/cursos`,options).pipe(map(res => res))
    }
}