import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { IPackage } from 'src/app/Models/ipackage';
import { IPackageOrder } from 'src/app/Models/ipackage-order';
import { PackageService } from 'src/app/Services/Package/package.service';

@Component({
  selector: 'app-package-order-chart',
  templateUrl: './package-order-chart.component.html',
  styleUrls: ['./package-order-chart.component.scss']
})
export class PackageOrderChartComponent implements OnInit {

  packageOrders2: IPackageOrder[] = [];
  packages2: IPackage[] = [];
  chart: any; // Reference to the chart object
  orders2: number[] = [];

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.packageService.getAllPackageOrders().subscribe({
      next: (data) => {
        this.packageOrders2 = data;
        console.log(this.packageOrders2);

        this.packageService.getAllPackages().subscribe({
          next: (data) => {
            this.packages2 = data;
            console.log(this.packages2);
            this.orders2 = this.packages2.map(
              (p) =>
                this.packageOrders2.filter((o) => o.packageID[0] === p._id).length
            );
            console.log(this.orders2);
              
            // Create the chart
            this.chart = new Chart('packageOrderChart', {
              type: 'line',
              options: {
                animation: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  },
                },
              },
              data: {
                labels: this.packages2.map((p) => p.name),
                datasets: [
                  {
                    // label: 'Package Orders',
                    data: this.orders2,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0
                  }
                ],
              },
            });
          },
          error: (err) => {
            console.log('Error:', err);
          },
        });
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
}

