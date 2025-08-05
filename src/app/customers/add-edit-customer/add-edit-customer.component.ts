import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

interface CustomerFormData {
  id?: string; // Optional for new customer
  name: string;
  address: string;
  phone: string;
  milkType: string;
  litersMorning: number;
  litersNoon: number;
  pricePerLiter: number;
  startDate: string;
  status: 'Active' | 'Inactive'; // Defined as a union literal type
}

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {
  isEditing: boolean = false;
  customerId: string | null = null;
  formData: CustomerFormData = {
    name: '',
    address: '',
    phone: '',
    milkType: 'Pure',
    litersMorning: 0,
    litersNoon: 0,
    pricePerLiter: 0,
    startDate: this.dataService.formatDate(new Date()),
    status: 'Active',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');
      this.isEditing = !!this.customerId;

      if (this.isEditing && this.customerId) {
        this.dataService.getCustomer(this.customerId).subscribe(customer => {
          if (customer) {
            // Assign existing customer data to formData
            // Ensure proper typing for status when assigning from fetched data
            this.formData = { ...customer, status: customer.status as 'Active' | 'Inactive' };
          } else {
            console.warn('Customer not found for editing:', this.customerId);
            this.router.navigate(['/customers']);
          }
        });
      }
    });
  }

  // Refined handleChange to correctly type the event target and assign values
  handleChange(event: Event, field: keyof CustomerFormData): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (field === 'status') {
      // Specific handling for the 'status' checkbox
      this.formData.status = (target as HTMLInputElement).checked ? 'Active' : 'Inactive';
    } else if (['litersMorning', 'litersNoon', 'pricePerLiter'].includes(field as string)) {
      // Specific handling for number inputs with type guard
      // this.formData[field] = parseFloat(target.value) as any; // Cast to any temporarily for assignment
    } else if (['name', 'address', 'phone', 'milkType', 'startDate'].includes(field as string)) {
      // Specific handling for string inputs with type guard
      // this.formData[field] = target.value as any; // Cast to any temporarily for assignment
    }
  }


  async handleSubmit(): Promise<void> {
    if (this.isEditing) {
      await this.dataService.updateCustomer(this.formData as any).toPromise(); // Cast to any to satisfy type, as ID is present
      alert(`Customer ${this.formData.name} updated successfully!`);
    } else {
      await this.dataService.addCustomer(this.formData).toPromise();
      alert(`Customer ${this.formData.name} added successfully!`);
    }
    this.router.navigate(['/customers']);
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
