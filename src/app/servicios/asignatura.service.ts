import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class AsignaturaService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getAsignaturas(){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/asignaturas`,options).pipe(map(res => res))
    }

	getAsignatura(id:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/asignaturas/${id}`,options).pipe(map(res => res))
	}

	getAsignaturasCurso(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
	  return this.httpClient.get(`${this.API_URL}/asignaturas/curso/${id}`,options).pipe(map(res => res))
	}

	deleteAsignatura(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/asignaturas/${id}`,options).pipe(map(res => res))
	}

	postAsignatura(data:any){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/asignaturas`, JSON.stringify(data), options).pipe(map(res => res))
	}

	getGraficoRendimientoEvaluacionesAsignatura(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/evaluaciones/asignatura/${id}`,options).pipe(map(res => res))
	}

	getGraficoAsistenciaAsignatura(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/asistencia/asignatura/${id}`,options).pipe(map(res => res))
	}
}