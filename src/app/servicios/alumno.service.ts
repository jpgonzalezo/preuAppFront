import { HttpClient, HttpRequest, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class AlumnoService {
  API_URL = Config.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  getAlumno():any{
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/alumnos`,options).pipe(map(res => res))
	}

	postAlumno(data:any):any{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers: headers
    }
    return this.httpClient.post(`${this.API_URL}/alumnos`, JSON.stringify(data), options).pipe(map(res => res))
  }
  
  deleteAlumno(id:any){
    const headers = new HttpHeaders({ 'Content-type':'application/json'});
    const options = {
      headers:headers
    }
    return this.httpClient.delete(`${this.API_URL}/alumno/${id}`, options).pipe(map(res => res))
  }

  getHojaVida(id:any){
    const headers = new HttpHeaders({ 'Content-type':'application/json'});
    const options = {
      headers:headers
    }
    return this.httpClient.get(`${this.API_URL}/hoja_vida/${id}`,options).pipe(map(res => res))
  }

  uploadImage(data:FormData, id:string){
    const headers = new HttpHeaders({ 'Content-type':'application/json'});
    const options = {
      headers:headers
    }
    return this.httpClient.post(`${this.API_URL}/alumno_imagen/${id}`,data).pipe(map(res => res)) 
  }

  uploadImageDefault(id:string){
    const headers = new HttpHeaders({ 'Content-type':'application/json'});
    const options = {
      headers:headers
    }
    return this.httpClient.get(`${this.API_URL}/alumno_imagen_default/${id}`,options).pipe(map(res => res))
  }
}