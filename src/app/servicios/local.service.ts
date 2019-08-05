import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {
    token:string
    constructor() { }
    getToken(){
        return this.token
    }
    setToken(token_nuevo:string){
        this.token = token_nuevo
    }
}