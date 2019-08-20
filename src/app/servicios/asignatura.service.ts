import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class AsignaturaService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getAsignaturas(token:string){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token});
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/asignaturas`,options).pipe(map(res => res))
    }

	getAsignatura(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/asignaturas/${id}`,options).pipe(map(res => res))
	}

	getAsignaturaToken(token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/asignatura`,options).pipe(map(res => res))
	}

	getAsignaturasCurso(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token });
		const options = {
			headers: headers
		}
	  return this.httpClient.get(`${this.API_URL}/asignaturas/curso/${id}`,options).pipe(map(res => res))
	}

	deleteAsignatura(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/asignaturas/${id}`,options).pipe(map(res => res))
	}

	postAsignatura(data:any,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/asignaturas`, JSON.stringify(data), options).pipe(map(res => res))
	}

	getGraficoRendimientoEvaluacionesAsignatura(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/evaluaciones/asignatura/${id}`,options).pipe(map(res => res))
	}

	getGraficoRendimientoEvaluacionesAsignaturaToken(token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/evaluaciones/asignatura`,options).pipe(map(res => res))
	}

	getGraficoAsistenciaAsignatura(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/asistencia/asignatura/${id}`,options).pipe(map(res => res))
	}

	getGraficoAsistenciaAsignaturaToken(token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/asistencia/asignatura`,options).pipe(map(res => res))
	}
}