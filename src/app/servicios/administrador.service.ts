import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdministradorService {
	API_URL = environment.API_SERVER_URL;
	constructor(private httpClient: HttpClient) { }

  	getAdministradores(token:string):any{
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token':token});
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/administradores`,options).pipe(map(res => res))
	}

	deleteAdministrador(id:any,token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json','auth-token':token});
		const options = {
			headers:headers
		}
		return this.httpClient.delete(`${this.API_URL}/administradores/${id}`, options).pipe(map(res => res))
	}

	getAdministrador(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json','auth-token':token});
		const options = {
			headers:headers
		}
		return this.httpClient.get(`${this.API_URL}/administradores/${id}`, options).pipe(map(res => res))
	}

	putAdministrador(id:string, data:any, token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json','auth-token':token});
		const options = {
			headers:headers
		}
		return this.httpClient.put(`${this.API_URL}/administradores/${id}`, JSON.stringify(data) ,options).pipe(map(res => res))
	}

	postAdministrador(data:any,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
		  headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/administradores`, JSON.stringify(data), options).pipe(map(res => res)) 
	}

	uploadImage(data:FormData, id:string,token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json','auth-token':token});
		const options = {
		  headers:headers
		}
		return this.httpClient.post(`${this.API_URL}/administrador_imagen/${id}`,data).pipe(map(res => res)) 
	  }
	
	uploadImageDefault(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-type':'application/json','auth-token':token});
		const options = {
			headers:headers
		}
		return this.httpClient.get(`${this.API_URL}/administrador_imagen_default/${id}`,options).pipe(map(res => res))
	}
}