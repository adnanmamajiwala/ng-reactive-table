import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {ProductInfo} from './sample-data/sample-data.model';
import {draw} from 'patternomaly';

declare const palette: any;

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

  update(products: ProductInfo[]): void {
    const labels: Label[] = [];
    const nums: number[] = [];
    let max: number = 0;
    products.forEach((product, index) => {
      labels.push([product.name]);
      nums.push(product.rating);
      max = Math.max(max, product.rating);
    });

    this.barChartLabels = labels;
    this.barChartData = this.buildChartData(nums);
    this.barChartOptions = this.buildBarChartOptions(max);
    this.changeRef.detectChanges();
  }

  private buildChartData(nums: number[]): ChartDataSets[] {
    const colours = palette(['mpn65', 'tol-rainbow'], nums.length);
    return [
      {
        data: nums,
        backgroundColor: () => colours.map((hex: string) => '#' + hex + '66'),
        borderColor: () => colours.map((hex: string) => '#' + hex + 'b2'),
        hoverBackgroundColor: draw('diagonal-right-left', '#D5D5D5B2'),
        hoverBorderColor: '#909090',
        borderWidth: 1,
      },
    ];
  }

  private buildBarChartOptions(num: number): ChartOptions {
    let max = 1;
    const ticks: number[] = [0, 1];
    while (max < num) {
      ticks.push(max *= 10);
    }
    return {
      responsive: true,
      title: {
        display: true,
        text: 'Product global rating for 2021',
      },
      scales: {
        yAxes: [
          {
            type: 'logarithmic',
            ticks: {
              min: 0.1,
              max: max,
              callback: (value) => Number(value.toString()),
            },
            afterBuildTicks: () => ticks,
          },
        ],
      },
    };
  }
}
