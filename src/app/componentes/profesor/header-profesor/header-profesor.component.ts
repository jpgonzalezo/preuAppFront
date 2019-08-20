import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-header-profesor',
  templateUrl: './header-profesor.component.html',
  styleUrls: ['./header-profesor.component.css']
})
export class HeaderProfesorComponent implements OnInit {

  //dentro del constructor se declaran los servicios que se van a utilizar
  constructor(private _loginService: LoginService,
    private _storageService: StorageService) {}

  ngOnInit() {}
  public logout(): void {
    this._loginService.logout().subscribe(
      response => {
        if (response) {
          this._storageService.logout();
        }
      }
    );
  }

}
