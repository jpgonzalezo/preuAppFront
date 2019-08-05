import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class JustificacionService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getJustificaciones(token:string){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token});
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/justificaciones`,options).pipe(map(res => res))
    }

	getJustificacion(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/justificaciones/${id}`,options).pipe(map(res => res))
	}

	postJustificacion(data:any,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/justificaciones`, JSON.stringify(data), options).pipe(map(res => res))
	}

	getJustificacionesAlumno(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/justificaciones_alumno/${id}`,options).pipe(map(res => res))
	}
	deleteJustificacion(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.delete(`${this.API_URL}/justificaciones/${id}`,options).pipe(map(res => res))
	}
}