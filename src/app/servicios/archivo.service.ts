import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ArchivoService {
	API_URL = environment.API_SERVER_URL;
	constructor(private httpClient: HttpClient) { }

	getArchivoByAsignatura(token: string) {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'auth-token': token });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/archivoAsignatura`, options).pipe(map(res => res))
	}

	getArchivoById(token: string, id_archivo: string) {
		const headers = new HttpHeaders({  'auth-token': token });

		return this.httpClient.get(`${this.API_URL}/archivo/${id_archivo}`, {headers, responseType: "arraybuffer"
		}).pipe(map(res => res))
	}


	addArchivoByAsignatura(token: string, file: any) {
		const headers = new HttpHeaders({ 'auth-token': token });
		const options = {
			headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/archivoAsignatura`, file, options).pipe(map(res => res))
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