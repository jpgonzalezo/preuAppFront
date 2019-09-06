import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class TopicoService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getTopicos(token:string):any{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/topicos`,options).pipe(map(res => res))
    }

    postTopico(nombre:any,token:string):any{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
        const options = {
          headers: headers
        }
        return this.httpClient.post(`${this.API_URL}/topicos`, {'nombre':nombre}, options).pipe(map(res => res))
    }

    getTopicosAsignatura(id:any,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/topicos_asignatura/${id}`,options).pipe(map(res => res))
    }

    getTopicosAsignaturaToken(token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/topicos/asignatura`,options).pipe(map(res => res))
    }

    deleteTopico(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.delete(`${this.API_URL}/topicos/${id}`,options).pipe(map(res => res))
    }
}