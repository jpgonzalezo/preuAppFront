import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class EvaluacionService {
    API_URL = environment.API_SERVER_URL;
    constructor(private httpClient: HttpClient) { }

    getEvaluacion(id_evaluacion:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
      return this.httpClient.get(`${this.API_URL}/evaluaciones/${id_evaluacion}`,options).pipe(map(res => res))
    }

    getEvaluacionesPrueba(id_prueba:string,token:string){
  	    const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
  	    const options = {
  		    headers: headers
  	    }
        return this.httpClient.get(`${this.API_URL}/evaluaciones/prueba/${id_prueba}`,options).pipe(map(res => res))
    }

    getEvaluacionesAlumno(token:string,id_asignatura:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/evaluaciones/alumno/asignatura/${id_asignatura}`,options).pipe(map(res => res))
    }

    getEvaluacionGridRegistrar(id_prueba:string,id_curso:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/evaluaciones/prueba/${id_prueba}/curso/${id_curso}/registrar`,options).pipe(map(res => res))
    }

    getEvaluacionGridRegistrarEditar(id_evaluacion:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/evaluaciones/${id_evaluacion}/editar/registro/filas`,options).pipe(map(res => res))
    }

    getColumnDefs(id_prueba:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/evaluaciones/prueba/${id_prueba}/registrar/columnas`,options).pipe(map(res => res))
    }

    registrarEvaluaciones(id_prueba:string,token:string,data:any[]){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.post(`${this.API_URL}/pruebas/${id_prueba}/registrar/evaluaciones`,{'data':data},options).pipe(map(res => res))
    }

    registrarEvaluacionEditada(id_evaluacion:string,token:string,data:any[]){
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.post(`${this.API_URL}/evaluaciones/${id_evaluacion}/editar/alternativas`,{'data':data},options).pipe(map(res => res))
    }
    
    deleteEvaluacion(id_evaluacion:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.delete(`${this.API_URL}/evaluaciones/${id_evaluacion}`,options).pipe(map(res => res))
    }
    cambiarPuntaje(id_evaluacion:string,puntaje:string,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.put(`${this.API_URL}/evaluaciones/${id_evaluacion}/puntaje`,{'puntaje':puntaje},options).pipe(map(res => res))
    }
    responderAutoevaluacion(data:any,token:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
	  	return this.httpClient.post(`${this.API_URL}/autoevaluacion`,{'data':data},options).pipe(map(res => res))

    }

    getEvaluacionesPendientes(token:string,id_asignatura:string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','auth-token':token });
        const options = {
            headers: headers
        }
        return this.httpClient.get(`${this.API_URL}/pruebasNoRespondidas?asignatura_id=${id_asignatura}`,options).pipe(map(res => res))
    }
}