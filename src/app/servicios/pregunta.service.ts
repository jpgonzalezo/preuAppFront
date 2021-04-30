import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class PreguntaService {
	API_URL = environment.API_SERVER_URL;
	constructor(private httpClient: HttpClient) { }

	getPlantilla(token: string) {
		const headers = new HttpHeaders({ 'auth-token': token });

		return this.httpClient.get(`${this.API_URL}/preguntaExcel`, {
			headers, responseType: "arraybuffer"
		}).pipe(map(res => res))
	}

}