import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AsistenciaService {
  API_URL = environment.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

	getJustificacionesAsistencia(id_asistencia:string, token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/justificaciones_asistencia/${id_asistencia}`,options).pipe(map(res => res))
	}
	getAsistencia(id:string, token:string):any{
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/asistencias/${id}`,options).pipe(map(res => res))
	}
  	getAsistencias(token:string):any{
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/asistencias`,options).pipe(map(res => res))
	}

	getAsistenciasCurso(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/asistencias_curso/${id}`,options).pipe(map(res => res))
	}

	getAsistenciasAsignatura(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/asistencias_asignatura/${id}`,options).pipe(map(res => res))
	}

	getAsistenciasAsignaturaToken(token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/asistencias/asignatura`,options).pipe(map(res => res))
	}

	getAsistenciaAlumnoAsignatura(token:string,id_asignatura:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/asistencias/alumno/asignatura/${id_asignatura}`,options).pipe(map(res => res))
	}

	deleteAsistencia(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/asistencias/${id}`,options).pipe(map(res => res))
	}

	postAsistencia(data:any,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token  });
		const options = {
		headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/asistencias`, JSON.stringify(data), options).pipe(map(res => res))
	}

	putAsistencia(data:any,token:string, id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token  });
		const options = {
		headers: headers
		}
		return this.httpClient.put(`${this.API_URL}/asistencias/${id}`, JSON.stringify(data), options).pipe(map(res => res))
	}
	
	postJustificacion(data:any,token:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
    const options = {
      headers: headers
    }
    return this.httpClient.post(`${this.API_URL}/justificaciones`, JSON.stringify(data), options).pipe(map(res => res))
	}
}