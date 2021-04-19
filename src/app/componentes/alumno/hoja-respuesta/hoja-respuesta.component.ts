import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 22, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 25, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-hoja-respuesta',
  templateUrl: './hoja-respuesta.component.html',
  styleUrls: ['./hoja-respuesta.component.css']
})
export class HojaRespuestaComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor() { }

}
