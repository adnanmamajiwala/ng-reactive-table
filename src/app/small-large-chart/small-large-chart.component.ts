import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label, MultiLineLabel} from 'ng2-charts';
import {SampleDataModel} from './sample-data/sample-data.model';

@Component({
  selector: 'app-small-large-chart',
  templateUrl: './small-large-chart.component.html',
  styleUrls: ['./small-large-chart.component.scss'],
})
export class SmallLargeChartComponent implements OnInit {

  barChartOptions: ChartOptions = {};
  barChartLabels: Label[] = [];
  barChartData: ChartDataSets[] = [];

  constructor(private changeRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  update(data: SampleDataModel[]): void {
    const labels: Label[] = [];
    const nums: number[] = [];
    let max: number = 0;
    data.forEach((model, index) => {
      labels.push([model.name]);
      nums.push(model.value);
      max = Math.max(max, model.value);
    });
    this.barChartLabels = labels;
    this.barChartData = [{data: nums}];
    this.barChartOptions = this.buildBarChartOptions(max);
    this.changeRef.detectChanges();
  }

  private buildBarChartOptions(num: number): ChartOptions {
    let max = 1;
    const ticks: number[] = [0, 1];
    while (max < num) {
      ticks.push(max *= 10);
    }
    return {
      responsive: true,
      scales: {
        yAxes: [
          {
            type: 'logarithmic',
            ticks: {
              min: 0.1,
              max: max,
              callback: (value) => Number(value.toString()),
            },
            afterBuildTicks: () => ticks
          },
        ],
      },
    };
  }
}
