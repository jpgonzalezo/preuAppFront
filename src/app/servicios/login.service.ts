import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { Session } from "../modelos/session.model";
import { StorageService } from "src/app/servicios/storage.service";
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { LocalService } from "./local.service";
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from "@angular/router";
@Injectable()
export class LoginService {
    private currentSessionDate = 0;
    private expiredSessionDate = 0;
    private activeDownCount = false;
    constructor(
        private http: Http,
        private httpClient: HttpClient,
        private storageService: StorageService,
        private localService: LocalService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}
    private basePath = Config.API_SERVER_URL;

        /**
     * The User Object
     */
    public get currentUserValue(){
        return this.storageService.getCurrentUser();
    }

    login(loginObj: any){
        return this.http.post(this.basePath + '/login', loginObj).pipe(map(user => {
            let body = this.extractData(user);
            if(body && body.token){
                this.storageService.setCurrentSession({token:body.token,user: {tipo: body.tipo }});
                this.localService.setToken(this.storageService.getCurrentToken())
                this.refreshSession(true);
            }
            return body;
        }));
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

    refreshSession(refresh = false) {
        this.currentSessionDate = new Date().getTime();
        if (refresh) this.expiredSessionDate = this.currentSessionDate + environment.sessionTime;
        if (this.currentUserValue && (!refresh || !this.activeDownCount)) {
            this.activeDownCount = true;
            setTimeout(() => {
                if (this.currentSessionDate < this.expiredSessionDate) {
                    this.refreshSession();
                } else {
                    this.logout();
                    this.router.navigate(['/inicio']);
                }
            }, 100);
        }
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }


}
