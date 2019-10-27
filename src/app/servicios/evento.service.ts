import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class EventoService {
  API_URL = Config.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

    getEventos(token:string):any{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/eventos`,options).pipe(map(res => res))
    }

    postEvento(data:any,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
          headers: headers
        }
        return this.httpClient.post(`${this.API_URL}/eventos`, JSON.stringify(data), options).pipe(map(res => res))
    }

    deleteEvento(id:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
        const options = {
            headers: headers
        }
        return this.httpClient.delete(`${this.API_URL}/eventos/${id}`,options).pipe(map(res => res))
    }

    getSolicitudesEventos(token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/eventos/solicitudes`,options).pipe(map(res => res))
    }

    aceptarEvento(id:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.put(`${this.API_URL}/eventos/${id}`,[],options).pipe(map(res => res))
    }
}