import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class VideoService {
  API_URL = Config.API_SERVER_URL;
  constructor(private httpClient: HttpClient) { }

  	getVideos(token:string, asignatura_id: string, curso_id: string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/video?asignatura_id`+ asignatura_id + '&curso_id' + curso_id ,options).pipe(map(res => res))
	}

	addVideo(data:any,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
		  headers: headers
		}
		return this.httpClient.post(`${this.API_URL}/video`, JSON.stringify(data), options).pipe(map(res => res))
	}

	deleteVideo(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.delete(`${this.API_URL}/cursos/${id}`,options).pipe(map(res => res))
	}


}