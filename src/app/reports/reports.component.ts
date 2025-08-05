import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

interface ReportSummary {
  totalLiters: number;
  totalRevenue: number;
  milkTypeBreakdown: { [key: string]: number };
  topCustomers: { name: string; liters: number }[];
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
startDate: string = this.dataService.formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  endDate: string = this.dataService.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
  report: ReportSummary = {
    totalLiters: 0,
    totalRevenue: 0,
    milkTypeBreakdown: { Pure: 0, Mix: 0, Cow: 0 },
    topCustomers: []
  };
  milkTypeBreakdownEntries: { type: string; liters: number }[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.generateReport();
  }

  generateReport(): void {
    this.dataService.getCustomers().subscribe(customers => {
      let totalLiters = 0;
      let totalRevenue = 0;
      const milkTypeBreakdown: { [key: string]: number } = { Pure: 0, Mix: 0, Cow: 0 };
      const customerLiters: { [key: string]: number } = {};

      customers.forEach(customer => {
        customerLiters[customer.name] = 0;
        customer.dailyLog?.forEach(log => {
          if (log.date >= this.startDate && log.date <= this.endDate) {
            totalLiters += log.total;
            totalRevenue += log.total * customer.pricePerLiter;
            milkTypeBreakdown[customer.milkType] = (milkTypeBreakdown[customer.milkType] || 0) + log.total;
            customerLiters[customer.name] += log.total;
          }
        });
      });

      const sortedCustomers = Object.entries(customerLiters)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .map(([name, liters]) => ({ name, liters: liters as number }));

      this.report = {
        totalLiters,
        totalRevenue,
        milkTypeBreakdown,
        topCustomers: sortedCustomers.slice(0, 5)
      };
      this.milkTypeBreakdownEntries = Object.entries(milkTypeBreakdown).map(([type, liters]) => ({ type, liters }));
    });
  }

  handleExport(type: string): void {
    alert(`Exporting report as ${type} for ${this.startDate} to ${this.endDate}. (Mock export)`);
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
