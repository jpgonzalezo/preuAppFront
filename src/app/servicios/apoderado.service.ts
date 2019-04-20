import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class ApoderadoService {
  API_URL = Config.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  getApoderados():any{
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/apoderados`,options).pipe(map(res => res))
	}

	deleteApoderado(id:any){
		const headers = new HttpHeaders({ 'Content-type':'application/json'});
		const options = {
			headers:headers
		}
		return this.httpClient.delete(`${this.API_URL}/apoderados/${id}`, options).pipe(map(res => res))
	}

	postApoderado(data:any){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const options = {
		  headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/apoderados`, JSON.stringify(data), options).pipe(map(res => res)) 
	}

	uploadImage(data:FormData, id:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json'});
		const options = {
		  headers:headers
		}
		return this.httpClient.post(`${this.API_URL}/apoderado_imagen/${id}`,data).pipe(map(res => res)) 
	  }
	
	uploadImageDefault(id:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json'});
		const options = {
			headers:headers
		}
		return this.httpClient.get(`${this.API_URL}/apoderado_imagen_default/${id}`,options).pipe(map(res => res))
	}

	asignarAlumno(id_apoderado,id_alumno){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
		}
    return this.httpClient.get(`${this.API_URL}/apoderado_alumno/${id_apoderado}/${id_alumno}`,options).pipe(map(res => res))
	}
}