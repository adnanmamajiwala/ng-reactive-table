import {Component, OnInit} from '@angular/core';
import {CarsService} from './cars.service';
import {DataTableService} from '../data-table/data-table.service';
import {CarsDataSource} from './cars-data-source';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  constructor(private carService: CarsService,
              private dataService: DataTableService) {
  }

  ngOnInit(): void {
    this.dataService.updateCustomDataSource$(new CarsDataSource(this.carService));
  }

}
