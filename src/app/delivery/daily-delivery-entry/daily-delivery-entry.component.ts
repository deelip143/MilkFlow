import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

interface Customer {
  id: string;
  name: string;
  milkType: string;
  litersMorning: number;
  litersNoon: number;
}

interface DeliveryData {
  morningQty: number;
  noonQty: number;
  extraQty: number;
  skip: boolean;
}

@Component({
  selector: 'app-daily-delivery-entry',
  templateUrl: './daily-delivery-entry.component.html',
  styleUrls: ['./daily-delivery-entry.component.scss']
})
export class DailyDeliveryEntryComponent {
  allCustomers: Customer[] = [];
  selectedDate: string = this.dataService.formatDate(new Date());
  deliveryData: { [key: string]: DeliveryData } = {};

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(customers => {
      this.allCustomers = customers;
      this.initializeDeliveryData(customers);
    });
  }

  private initializeDeliveryData(customers: Customer[]): void {
    const initialData: { [key: string]: DeliveryData } = {};
    customers.forEach(customer => {
      initialData[customer.id] = {
        morningQty: customer.litersMorning || 0,
        noonQty: customer.litersNoon || 0,
        extraQty: 0,
        skip: false,
      };
    });
    this.deliveryData = initialData;
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    // In a real app, this would fetch/load delivery data for the selected date
    console.log("Date changed to:", this.selectedDate);
    this.initializeDeliveryData(this.allCustomers); // Re-initialize mock data for demonstration
  }

  handleQtyChange(customerId: string, field: 'morningQty' | 'noonQty' | 'extraQty', value: string): void {
    const parsedValue = parseFloat(value) || 0;
    this.deliveryData = {
      ...this.deliveryData,
      [customerId]: {
        ...this.deliveryData[customerId],
        [field]: parsedValue,
      },
    };
  }

  handleSkipToggle(customerId: string): void {
    const currentSkipState = this.deliveryData[customerId]?.skip || false;
    const customer = this.allCustomers.find(c => c.id === customerId);

    this.deliveryData = {
      ...this.deliveryData,
      [customerId]: {
        ...this.deliveryData[customerId],
        skip: !currentSkipState,
        // Reset quantities if skipping, or restore default if un-skipping
        morningQty: !currentSkipState ? 0 : (customer?.litersMorning || 0),
        noonQty: !currentSkipState ? 0 : (customer?.litersNoon || 0),
        extraQty: 0,
      },
    };
  }

  handleSaveAll(): void {
    console.log(`Saving delivery for ${this.selectedDate}:`, this.deliveryData);
    alert("Delivery data saved for " + this.selectedDate + ". (This is a mock save)");
    // In a real app, send deliveryData to Firebase/backend
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
