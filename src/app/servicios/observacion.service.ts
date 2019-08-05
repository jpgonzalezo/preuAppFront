import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class ObservacionService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getObservaciones(token:string):any{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/observaciones`,options).pipe(map(res => res))
    }

    postObservacion(data:any,token:string):any{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
          headers: headers
        }
        return this.httpClient.post(`${this.API_URL}/observaciones`, JSON.stringify(data), options).pipe(map(res => res))
    }

    getObservacionesAlumno(id:any, tipo:any,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/observaciones_alumno/${id}/${tipo}`,options).pipe(map(res => res))
    }
}