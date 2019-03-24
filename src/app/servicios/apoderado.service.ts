import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class ApoderadoService {
  API_URL = Config.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  getApoderados():any{
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/apoderados`,options).pipe(map(res => res))
	}
}