import { PackageService } from 'src/app/Services/Package/package.service';
import { Component, OnInit } from '@angular/core';
import { IPackage } from 'src/app/Models/ipackage';
import { Chart } from 'chart.js/auto';
import { IPackageOrder } from 'src/app/Models/ipackage-order';

@Component({
  selector: 'app-package-orders',
  templateUrl: './package-orders.component.html',
  styleUrls: ['./package-orders.component.scss'],
})
export class PackageOrdersComponent implements OnInit {
  packageOrders: IPackageOrder[] = [];
  packages: IPackage[] = [];
  chart: any; // Reference to the chart object
  orders: number[] = [];

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.packageService.getAllPackageOrders().subscribe({
      next: (data) => {
        this.packageOrders = data;
        console.log(this.packageOrders);

        this.packageService.getAllPackages().subscribe({
          next: (data) => {
            this.packages = data;
            console.log(this.packages);
            this.orders = this.packages.map(
              (p) =>
                this.packageOrders.filter((o) => o.packageID[0] === p._id).length
            );

            // Create the chart
            this.chart = new Chart('packageOrderChart', {
              type: 'bar',
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
                labels: this.packages.map((p) => p.name),
                datasets: [
                  {
                    label: 'Package Orders',
                    data: this.orders,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(153, 102, 255,1)',
                    ],
                    borderWidth: 1,
                  },
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
