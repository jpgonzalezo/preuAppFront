import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Session } from "../modelos/session.model";
import { StorageService } from "src/app/servicios/storage.service";
import { map } from 'rxjs/operators';
import { Config } from '../config';
@Injectable()
export class LoginService {
    constructor(
        private http: Http,
        private httpClient: HttpClient,
        private storageService: StorageService
    ) {}
    private basePath = Config.API_SERVER_URL;
    login(loginObj: any): Observable<Session> {
        return this.http.post(this.basePath + '/login', loginObj).pipe(map(this.extractData));
    }
    logout(): Observable<Boolean> {
    return this.http.post(this.basePath + '/logout', {}).pipe(map(this.extractData));
    }

    cambiarContrasena(passObject: any){
        let token = this.storageService.getCurrentToken();
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'auth-token':token});
		const options = {
			headers: headers
		}
        return this.httpClient.post(this.basePath + '/cambiar_contrasena',passObject,options).pipe(map(res => res));
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }


}
