import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Session} from "../modelos/session.model";
import { map } from 'rxjs/operators';
import { Config } from '../config';
@Injectable()
export class LoginService {
    constructor(private http: Http) {}
    private basePath = Config.API_SERVER_URL;
    login(loginObj: any): Observable<Session> {
        return this.http.post(this.basePath + '/login', loginObj).pipe(map(this.extractData));
    }
    logout(): Observable<Boolean> {
    return this.http.post(this.basePath + '/logout', {}).pipe(map(this.extractData));
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
}
