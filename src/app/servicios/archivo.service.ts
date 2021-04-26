import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ArchivoService {
	API_URL = environment.API_SERVER_URL;
	constructor(private httpClient: HttpClient) { }

	getArchivoByAsignatura(token: string, id_asignatura: string) {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': token });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/archivoAsignatura/` + id_asignatura, options).pipe(map(res => res))
	}

	addArchivoByAsignatura(token: string, id_asignatura: string, data: any) {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': token });
		const options = {
			headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/archivoAsignatura/${id_asignatura}` , data, options).pipe(map(res => res))
	}

	getAllArchivo(token: string) {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': token });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/archivos`, options).pipe(map(res => res))
	}


	deleteArchivo(id: string, token: string) {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': token });
		const options = {
			headers: headers
		}
		return this.httpClient.delete(`${this.API_URL}/archivo/${id}`, options).pipe(map(res => res))
	}


}