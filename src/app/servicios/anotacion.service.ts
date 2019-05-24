import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class AnotacionService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getAnotaciones(){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/anotaciones`,options).pipe(map(res => res))
    }

	getAnotacion(id:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/anotaciones/${id}`,options).pipe(map(res => res))
	}

    getAnotacionesProfesor(id:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/anotaciones_profesor/${id}`,options).pipe(map(res => res))
    }
}