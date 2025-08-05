import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  milkType: string;
  litersMorning: number;
  litersNoon: number;
  pricePerLiter: number;
  status: string;
  startDate: string;
  dailyLog?: DailyLogEntry[];
  communications?: CommunicationEntry[];
}

interface DailyLogEntry {
  date: string;
  morning: number;
  noon: number;
  extra: number;
  total: number;
  skip?: boolean;
}

interface CommunicationEntry {
  type: string;
  date: string;
  message: string;
}

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent {
  customer: Customer | undefined;
  activeTab: string = 'dailyLog';
  customerId: string | null = null;
monthlyTotalLiters: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');
      if (this.customerId) {
        this.dataService.getCustomer(this.customerId).subscribe(data => {
          if (data) {
            this.customer = data;
          } else {
            console.warn(`Customer with ID ${this.customerId} not found.`);
            this.router.navigate(['/customers']);
          }
        });
      }
    });
  }

  calculateBilling(log: DailyLogEntry[]): number {
    const monthlyTotal = log.reduce((sum, entry) => sum + entry.total, 0);
    return monthlyTotal * (this.customer?.pricePerLiter || 0);
  }

  navigate(path: string, id: string | null = null): void {
    if (id) {
      this.router.navigate([path, id]);
    } else {
      this.router.navigate([path]);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
