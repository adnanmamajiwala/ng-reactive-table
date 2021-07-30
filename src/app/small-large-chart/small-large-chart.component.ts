import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {getSampleData, SampleDataModel} from './sample-data/sample-data.model';

@Component({
  selector: 'app-small-large-chart',
  templateUrl: './small-large-chart.component.html',
  styleUrls: ['./small-large-chart.component.scss'],
})
export class SmallLargeChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          type: 'logarithmic',
          ticks: {
            min: 0.1,
            autoSkipPadding: 75,
            callback: (value) => Number(value.toString()),
          },
        },
      ],
    },
  };
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartLabels: Label[] = [];
  barChartData: ChartDataSets[] = [];
  max = 100
  min = 50;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.update(getSampleData());
  }

  update(data: SampleDataModel[]): void {
    const labels: Label[] = [];
    const nums: number[] = [];
    data.forEach(model => {
      labels.push(model.name);
      nums.push(model.value);
      this.min = Math.min(this.min, model.value);
      this.max = Math.max(this.max, model.value);
    });
    this.barChartLabels = labels;
    this.barChartData = [{data: nums}];
    if (!!this.barChartOptions && !!this.barChartOptions.scales && !!this.barChartOptions.scales.yAxes
      && !!this.barChartOptions.scales.yAxes[1] && !!this.barChartOptions.scales.yAxes[1].ticks) {
      this.barChartOptions.scales.yAxes[1].ticks.max = this.max;
    }
    this.changeDetectorRef.detectChanges();
  }

}
