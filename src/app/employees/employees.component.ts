import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DataTableService} from '../data-table/data-table.service';
import {EmployeesService} from './employees.service';
import {Employee} from './employee.model';
import {EmployeesDataSource} from './employees-data-source';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DataTableService
  ]
})
export class EmployeesComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  selectedEmployee: Employee;

  constructor(private dataTableService: DataTableService<Employee>,
              private employeesService: EmployeesService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.dataTableService.updateCustomDataSource$(new EmployeesDataSource(this.employeesService));
    this.dataTableService.rowClicked$().subscribe((value: Employee) => {
      if (!!value) {
        console.log('EmployeesComponent', value);
        this.selectedEmployee = value;
        this.modalService.open(this.content, {size: 'sm'});
      }
    });
  }

}
