import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Injectable()
export class LoginService {
    API_URL = Config.API_SERVER_URL;
    constructor(private http: HttpClient) {
    }

    login(data) {
        return this.http.post(`${this.API_URL}/login`, JSON.stringify(data));
    }
}
