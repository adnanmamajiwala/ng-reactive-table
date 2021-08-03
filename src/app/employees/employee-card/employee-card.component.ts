import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: Employee;
  @Output() close = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
