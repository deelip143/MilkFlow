import { Component } from '@angular/core';
import { Customer, DailyLogEntry, DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {
allCustomers: Customer[] = [];
  selectedMonth: string = '';
  selectedCustomerId: string = '';
  showPaidModal: boolean = false;

  availableMonths: string[] = [];
  selectedCustomer: Customer | undefined;
  filteredDailyLog: DailyLogEntry[] = [];
  totalLiters: number = 0;
  pricePerLiter: number = 0;
  totalBill: number = 0;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(customers => {
      this.allCustomers = customers;
      const months = [...new Set(customers.flatMap(c => c.dailyLog?.map(l => l.date.substring(0, 7)) || []))].sort().reverse();
      this.availableMonths = months;
      if (months.length > 0) {
        this.selectedMonth = months[0]; // Set default to most recent month
      }
      this.updateBillingDetails(); // Initial call
    });
  }

  updateBillingDetails(): void {
    const customer = this.allCustomers.find(c => c.id === this.selectedCustomerId);
    this.selectedCustomer = customer;
    if (customer) {
      const log = customer.dailyLog?.filter(log => log.date.startsWith(this.selectedMonth)) || [];
      this.filteredDailyLog = log;
      const liters = log.reduce((sum, entry) => sum + entry.total, 0);
      this.totalLiters = liters;
      this.pricePerLiter = customer.pricePerLiter;
      this.totalBill = liters * customer.pricePerLiter;
    } else {
      this.filteredDailyLog = [];
      this.totalLiters = 0;
      this.pricePerLiter = 0;
      this.totalBill = 0;
    }
  }

  handleMarkAsPaid(): void {
    alert(`Bill for ${this.selectedCustomer?.name} for ${this.selectedMonth} marked as Paid.`);
    this.showPaidModal = false;
    // In a real app, update Firestore for the customer's billing status
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
