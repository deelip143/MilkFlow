import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalCustomers: number = 0;
  totalLitersToday: number = 0;
  todayRevenue: number = 0;
  monthToDateRevenue: number = 0;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(customers => {
      this.totalCustomers = customers.length;
      const litersToday = customers.reduce((sum, cust) => sum + (cust.litersMorning || 0) + (cust.litersNoon || 0), 0);
      this.totalLitersToday = litersToday;
      this.todayRevenue = litersToday * 60; // Assuming avg price 60
      this.monthToDateRevenue = litersToday * 30 * 60; // Simple approximation
    });
  }

  navigate(path: string, id: string | null = null): void {
    if (id) {
      this.router.navigate([path, id]);
    } else {
      this.router.navigate([path]);
    }
  }
}
