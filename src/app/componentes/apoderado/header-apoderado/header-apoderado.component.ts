import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-header-apoderado',
  templateUrl: './header-apoderado.component.html',
  styleUrls: ['./header-apoderado.component.css']
})
export class HeaderApoderadoComponent implements OnInit {

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
