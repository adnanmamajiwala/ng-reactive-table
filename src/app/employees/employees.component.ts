import {Component, OnInit} from '@angular/core';
import {DataTableService} from '../data-table/data-table.service';
import {EmployeesService} from './employees.service';
import {Employee} from "./employee.model";
import {EmployeesDataSource} from "./employees-data-source";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [
    DataTableService
  ]
})
export class EmployeesComponent implements OnInit {

  constructor(private dataTableService: DataTableService<Employee>,
              private employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.dataTableService.updateCustomDataSource$(new EmployeesDataSource(this.employeesService));
    this.dataTableService.rowClicked$().subscribe(value => {
      console.log('EmployeesComponent', value);
    });
  }

}
