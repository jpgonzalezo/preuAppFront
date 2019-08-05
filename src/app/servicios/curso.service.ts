import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class CursoService {
  API_URL = Config.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  	getCursos(token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/cursos`,options).pipe(map(res => res))
	}

	getCurso(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/cursos/${id}`,options).pipe(map(res => res))
	}

	deleteCurso(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/cursos/${id}`,options).pipe(map(res => res))
	}

	postCurso(data:any,token:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
    const options = {
      headers: headers
    }
    return this.httpClient.post(`${this.API_URL}/cursos`, JSON.stringify(data), options).pipe(map(res => res))
	}
	
	addAsignatura(id_curso:string,id_asignatura:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
  	const options = {
  		headers: headers
  	}
    return this.httpClient.put(`${this.API_URL}/curso_asignatura/${id_curso}/${id_asignatura}`,options).pipe(map(res => res))
	}

	deleteCursoAsignatura(id_curso:string,id_asignatura:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/curso_asignatura/${id_curso}/${id_asignatura}`,options).pipe(map(res => res))
	}

	getGraficoAsistencia(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/curso_grafico_asistencia/${id}`,options).pipe(map(res => res))
	}
	getGraficoAsistenciaAsignatura(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/curso_grafico_asistencia_asignatura/${id}`,options).pipe(map(res => res))
	}

	getGraficoAsignaturas(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/curso_grafico_asignaturas/${id}`,options).pipe(map(res => res))
	}

}