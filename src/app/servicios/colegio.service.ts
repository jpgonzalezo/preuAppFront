import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ColegioService {
  API_URL = environment.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  getColegios(token:string):any{
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token});
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/colegios`,options).pipe(map(res => res))
	}

	deleteColegio(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token});
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/colegios/${id}`,options).pipe(map(res => res))
	}

	postColegio(data:any,token:string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token});
    const options = {
      headers: headers
    }
    return this.httpClient.post(`${this.API_URL}/colegios`, JSON.stringify(data), options).pipe(map(res => res))
  }


}