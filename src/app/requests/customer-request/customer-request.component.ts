import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

interface Request {
  id: string;
  customerId: string;
  customerName: string;
  type: string;
  date: string;
  quantity?: number;
  status: string;
}

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrls: ['./customer-request.component.scss']
})
export class CustomerRequestComponent {
allRequests: Request[] = [];
  filteredRequests: Request[] = [];
  filter: string = 'Today';

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getRequests().subscribe(requests => {
      this.allRequests = requests;
      this.applyFilters();
    });
  }

  private getFormattedDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  applyFilters(): void {
    const today = this.getFormattedDate(new Date());
    const tomorrow = this.getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

    this.filteredRequests = this.allRequests.filter(request => {
      if (this.filter === 'Today') return request.date === today;
      if (this.filter === 'Tomorrow') return request.date === tomorrow;
      if (this.filter === 'Future') return request.date > tomorrow;
      return true; // All
    });
  }

  setStatusFilter(filter: string): void {
    this.filter = filter;
    this.applyFilters();
  }

  getStatusColor(status: string): string {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Fulfilled') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
