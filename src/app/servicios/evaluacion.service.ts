import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class EvaluacionService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getEvaluacionesPrueba(id_prueba:string,token:string){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/evaluaciones/prueba/${id_prueba}`,options).pipe(map(res => res))
    }
}