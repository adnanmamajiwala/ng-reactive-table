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
            autoSkip: true,
            min: 0.1, //minimum tick
            max: 13000, //maximum tick
            callback: (value) => Number(value.toString()),
          },
          afterBuildTicks: (chartObj) => { //Build ticks labelling as per your need
            chartObj.ticks = [];
            chartObj.ticks.push(0);
            chartObj.ticks.push(100);
            chartObj.ticks.push(1000);
            chartObj.ticks.push(15000);
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
    {data: [200, 300, 50, 310, 290, 12000], label: 'Company A'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
