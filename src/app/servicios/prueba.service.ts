import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class PruebaService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

	getGraficoRendimientoPreguntas(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/preguntas/${id}`,options).pipe(map(res => res))
	}
	getGraficoRendimientoTopicos(id: string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/topicos/${id}`,options).pipe(map(res => res))
	}

	getGraficoRendimientoCursos(id: string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/cursos/${id}`,options).pipe(map(res => res))
	}

  getPruebas(){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/pruebas`,options).pipe(map(res => res))
	}

	
	getPrueba(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/pruebas/${id}`,options).pipe(map(res => res))
	}

	getJustificacion(id:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/pruebas/${id}`,options).pipe(map(res => res))
	}

	getPruebasAsignaturas(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/pruebas_asignatura/${id}`,options).pipe(map(res => res))
	}
}