import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class ProfesorService {
	API_URL = Config.API_SERVER_URL;
	constructor(private httpClient: HttpClient) { }

	getProfesores(token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/profesores`,options).pipe(map(res => res))
	}

	getProfesoresAsignatura(id_asignatura:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/profesores_asignatura/${id_asignatura}`,options).pipe(map(res => res))
	}

	getProfesor(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json'  ,'auth-token':token});
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/profesores/${id}`,options).pipe(map(res => res))
	}

	deleteProfesor(id:any,token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json' ,'auth-token':token});
		const options = {
			headers:headers
		}
		return this.httpClient.delete(`${this.API_URL}/profesores/${id}`, options).pipe(map(res => res))
	}

	postProfesor(data:any,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/profesores`, JSON.stringify(data), options).pipe(map(res => res)) 
	}

	uploadImage(data:FormData, id:string,token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json','auth-token':token});
		const options = {
			headers:headers
		}
		return this.httpClient.post(`${this.API_URL}/profesor_imagen/${id}`,data).pipe(map(res => res)) 
		}
	
	uploadImageDefault(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json','auth-token':token});
		const options = {
			headers:headers
		}
		return this.httpClient.get(`${this.API_URL}/profesor_imagen_default/${id}`,options).pipe(map(res => res))
	}
}