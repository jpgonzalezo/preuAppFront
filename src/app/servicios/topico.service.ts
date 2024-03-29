import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TopicoService {
    API_URL = environment.API_SERVER_URL;
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

    deleteTopicoPrueba(id_topico:string,id_prueba:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.delete(`${this.API_URL}/topicos/${id_topico}/prueba/${id_prueba}`,options).pipe(map(res => res))
    }

    getTopicosPrueba(id_prueba:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/topicos/prueba/${id_prueba}`,options).pipe(map(res => res))
    }
}