import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-header-alumno',
  templateUrl: './header-alumno.component.html',
  styleUrls: ['./header-alumno.component.css']
})
export class HeaderAlumnoComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
  }
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
