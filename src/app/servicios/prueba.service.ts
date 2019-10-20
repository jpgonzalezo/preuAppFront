import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from '../config';

@Injectable()
export class PruebaService {
    API_URL = Config.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

	getGraficoRendimientoPreguntas(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/preguntas/${id}`,options).pipe(map(res => res))
	}
	getGraficoRendimientoTopicos(id: string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/topicos/${id}`,options).pipe(map(res => res))
	}

	getGraficoRendimientoCursos(id: string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
		return this.httpClient.get(`${this.API_URL}/grafico/rendimiento/cursos/${id}`,options).pipe(map(res => res))
	}

  getPruebas(token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/pruebas`,options).pipe(map(res => res))
	}

	
	getPrueba(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/pruebas/${id}`,options).pipe(map(res => res))
	}

	getJustificacion(id:string,token:string){
  	const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	const options = {
  		headers: headers
  	}
    return this.httpClient.get(`${this.API_URL}/pruebas/${id}`,options).pipe(map(res => res))
	}

	getPruebasAsignaturas(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/pruebas_asignatura/${id}`,options).pipe(map(res => res))
	}

	getPruebasAsignaturaToken(token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.get(`${this.API_URL}/pruebas/asignatura`,options).pipe(map(res => res))
	}

	postPrueba(nombre:string,tipo:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
          headers: headers
        }
        return this.httpClient.post(`${this.API_URL}/pruebas`, {"nombre":nombre,"tipo":tipo}, options).pipe(map(res => res))
	}
	
	deletePrueba(id:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  		const options = {
  			headers: headers
  		}
    	return this.httpClient.delete(`${this.API_URL}/pruebas/${id}`,options).pipe(map(res => res))
	}

	deletePregunta(id:string,numero:number,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
		const options = {
			headers: headers
		}
	  	return this.httpClient.delete(`${this.API_URL}/pruebas/${id}/pregunta/${numero}`,options).pipe(map(res => res))
	}

	agregarTopico(id_topico:string,id_prueba:string,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.put(`${this.API_URL}/pruebas/${id_prueba}/topico`,{'id':id_topico},options).pipe(map(res => res))
	}

	agregarPregunta(id_prueba:string,token:string,id_topico:string,tipo:string,alternativa:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.post(`${this.API_URL}/pruebas/${id_prueba}/pregunta`,{'tipo':tipo,'alternativa':alternativa,'topico':id_topico},options).pipe(map(res => res))
	}

	subirPregunta(id_prueba:string,numero_pregunta:number,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.post(`${this.API_URL}/pruebas/${id_prueba}/pregunta/subir`,{'numero':numero_pregunta},options).pipe(map(res => res))
	}

	bajarPregunta(id_prueba:string,numero_pregunta:number,token:string){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.post(`${this.API_URL}/pruebas/${id_prueba}/pregunta/bajar`,{'numero':numero_pregunta},options).pipe(map(res => res))
	}

	asignarPuntajeBase(id_prueba:string, puntaje:number,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.put(`${this.API_URL}/pruebas/${id_prueba}/asignar/puntaje/base`,{'puntaje_base':puntaje},options).pipe(map(res => res))
	}
}