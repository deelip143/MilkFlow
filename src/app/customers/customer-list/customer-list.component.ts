import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  allCustomers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm: string = '';
  filterArea: string = 'All';
  filterMilkType: string = 'All';
  uniqueAreas: string[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(customers => {
      this.allCustomers = customers;
      const areas = [...new Set(customers.map(c => c.address.split(',')[1]?.trim()).filter(Boolean))];
      this.uniqueAreas = areas;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = this.allCustomers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.phone.includes(this.searchTerm);
      const matchesArea = this.filterArea === 'All' || customer.address.includes(this.filterArea);
      const matchesMilkType = this.filterMilkType === 'All' || customer.milkType === this.filterMilkType;
      return matchesSearch && matchesArea && matchesMilkType;
    });
    this.filteredCustomers = filtered;
  }

  navigate(path: string, id: string | null = null): void {
    if (id) {
      this.router.navigate([path, id]);
    } else {
      this.router.navigate([path]);
    }
  }
}
