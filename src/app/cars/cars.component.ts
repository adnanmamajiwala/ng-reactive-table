import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CarsService} from './cars.service';
import {DataTableService} from '../data-table/data-table.service';
import {CarsDataSource} from './cars-data-source';
import {Car} from "./car.model";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DataTableService
  ]
})
export class CarsComponent implements OnInit {

  constructor(private carService: CarsService,
              private dataTableService: DataTableService<Car>) {
  }

  ngOnInit(): void {
    this.dataTableService.updateCustomDataSource$(new CarsDataSource(this.carService));
  }

}
