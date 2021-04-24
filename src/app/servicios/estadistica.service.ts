import { HttpClient, HttpRequest, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class EstadisticaService {
  API_URL = environment.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  getEstadisticaResumen(token:string):any{
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/alumnos`,options).pipe(map(res => res))
	}
}