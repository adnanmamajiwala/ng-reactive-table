import {Component, OnInit} from '@angular/core';
import {DataTableConfiguration} from '../data-table/data-table.model';
import {Car} from './car.model';
import {CarsService} from './cars.service';
import {DataTableService} from '../data-table/data-table.service';

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
    this.carService.retrieve()
      .subscribe((cars: Car[]) => {
        const config = new DataTableConfiguration<Car>();
        config.data = cars;
        config.columnInfoList.push({name: 'id', displayText: 'Id'});
        config.columnInfoList.push({name: 'manufacture', displayText: 'Manufacture'});
        config.columnInfoList.push({name: 'model', displayText: 'Model'});
        config.columnInfoList.push({name: 'type', displayText: 'Type'});
        config.columnInfoList.push({name: 'fuel', displayText: 'Fuel'});
        config.columnInfoList.push({name: 'color', displayText: 'Color'});
        config.columnInfoList.push({name: 'vin', displayText: 'VIN'});
        config.columnInfoList.push({name: 'createdAt', displayText: 'Launch Date'});
        this.dataService.updateConfig$(config);
      });
  }

}
