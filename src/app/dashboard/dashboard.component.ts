import { Component, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import * as ApexCharts from 'apexcharts'
import { BehaviorSubject, Subscription } from 'rxjs';
import { ThemeService } from './theme.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isDashboard: boolean = false;
  theme_mode: string = "day_theme";
  themeSubscription: Subscription;
  @ViewChild("linechart") chart: ChartComponent;
  public chartOptions: any = {
    series: [
      {
        name: "blue",
        data: [
          {
            x: "Team A",
            y: [1, 5]
          },
          {
            x: "Team B",
            y: [4, 6]
          },
          {
            x: "Team C",
            y: [5, 8]
          },
          {
            x: "Team D",
            y: [3, 11]
          }
        ]
      },
      {
        name: "green",
        data: [
          {
            x: "Team A",
            y: [2, 6]
          },
          {
            x: "Team B",
            y: [1, 3]
          },
          {
            x: "Team C",
            y: [7, 8]
          },
          {
            x: "Team D",
            y: [5, 9]
          }
        ]
      }
    ],
    chart: {
      type: "rangeBar",
      height: 150
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    dataLabels: {
      enabled: true
    }
  };

  constructor(private router: Router,
    private authService: AuthService,
    private themeService: ThemeService) {
      this.loadLineChart();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        //Show loading indicator
        console.log('Navigation start', this.router.url);
      }
      if (event instanceof NavigationEnd) {
        //Hide loading indicator
        console.log('Navigation end', this.router.url);
        this.isDashboard = this.router.url == '/' ? true : false;
        if (this.isDashboard) {
          this.loadPieChart();
          this.getCovidReport();
        }
      }
    });
    this.themeSubscription = this.themeService.getMode().subscribe(mode => {
      if (mode) {
        this.theme_mode = mode;
        console.log('dashboard getting', mode)
      } else {
        this.theme_mode = "";
      }
    });
  }


  ngOnInit() {

  }

  getCovidReport() {
    this.authService.getCovid()
      .subscribe((report) => {
        let data = report.map((rp: any) => {
          return rp.population
        });
        let country = report.map((rp: any) => {
          return rp.country
        });
        this.loadBarChart(data, country)
      })
  }


  loadPieChart() {
    let options = {
      series: [44, 55, 13, 43, 22, 34],
      chart: {
        width: 350,
        type: 'pie'
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team A'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    setTimeout(() => {
      let chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }, 2000)

  }

  loadBarChart(data: number[], categories: string[]) {
    var options = {
      series: [{
        data: data
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
      }
    };

    var chart = new ApexCharts(document.querySelector("#barchart"), options);
    chart.render();
  }

  loadLineChart() {
    this.chartOptions = {
      series: [
        {
          name: "blue",
          data: [
            {
              x: "Team A",
              y: [1, 5]
            },
            {
              x: "Team B",
              y: [4, 6]
            },
            {
              x: "Team C",
              y: [5, 8]
            },
            {
              x: "Team D",
              y: [3, 11]
            }
          ]
        },
        {
          name: "green",
          data: [
            {
              x: "Team A",
              y: [2, 6]
            },
            {
              x: "Team B",
              y: [1, 3]
            },
            {
              x: "Team C",
              y: [7, 8]
            },
            {
              x: "Team D",
              y: [5, 9]
            }
          ]
        }
      ],
      chart: {
        type: "rangeBar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: true
      }
    };
  }
}
