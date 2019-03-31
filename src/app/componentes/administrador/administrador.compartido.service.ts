import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdministradorCompartidoService {
    constructor(private http: HttpClient) {}
}