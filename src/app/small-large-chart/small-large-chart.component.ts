import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-small-large-chart',
  templateUrl: './small-large-chart.component.html',
  styleUrls: ['./small-large-chart.component.scss'],
})
export class SmallLargeChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          type: 'logarithmic',
          ticks: {
            min: 0.1,
            max: 25000,
            callback: (value) => Number(value.toString()),
          },
          afterBuildTicks: function (chartObj: any, nums: number[]): number[] {
            console.log(chartObj);
            chartObj.ticks = [];
            chartObj.ticks.push(0);
            chartObj.ticks.push(50);
            chartObj.ticks.push(25000);
            return chartObj.ticks;
          },
        },
      ],
    },
  };
  barChartLabels: Label[] = ['2013', '2014', '2015', '2016', '2017', '2018'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {data: [200, 300, 50, 3100, 290, 20000], label: 'Company A'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
