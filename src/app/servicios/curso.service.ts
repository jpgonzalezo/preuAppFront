import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class CursoService {
  API_URL = Config.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  getCursos(){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/cursos`,options).pipe(map(res => res))
	}

	getCurso(id:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/cursos/${id}`,options).pipe(map(res => res))
	}

	deleteCurso(id:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/cursos/${id}`,options).pipe(map(res => res))
	}

	postCurso(data:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers: headers
    }
    return this.httpClient.post(`${this.API_URL}/cursos`, JSON.stringify(data), options).pipe(map(res => res))
  }
}