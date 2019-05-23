import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class JustificacionService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getJustificaciones(){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/justificaciones`,options).pipe(map(res => res))
    }

	getJustificacion(id:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/justificaciones/${id}`,options).pipe(map(res => res))
	}

	postJustificacion(data:any){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/justificaciones`, JSON.stringify(data), options).pipe(map(res => res))
	}

	getJustificacionesAlumno(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/justificaciones_alumno/${id}`,options).pipe(map(res => res))
	}
}