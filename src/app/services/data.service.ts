import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Customer {
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

export interface DailyLogEntry {
  date: string;
  morning: number;
  noon: number;
  extra: number;
  total: number;
  skip?: boolean;
}

export interface CommunicationEntry {
  type: string;
  date: string;
  message: string;
}

export interface Request {
  id: string;
  customerId: string;
  customerName: string;
  type: string;
  date: string;
  quantity?: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mockCustomers: Customer[] = [
    {
      id: 'cust1', name: 'Ramesh Sharma', address: '123, Gandhi Nagar, Surat', phone: '9876543210',
      milkType: 'Pure', litersMorning: 2, litersNoon: 0, pricePerLiter: 60, status: 'Active', startDate: '2023-01-01',
      dailyLog: [
        { date: '2024-05-28', morning: 2, noon: 0, extra: 0, total: 2 },
        { date: '2024-05-29', morning: 2, noon: 0, extra: 0, total: 2 },
        { date: '2024-05-30', morning: 2, noon: 0, extra: 1, total: 3 },
      ],
      communications: [
        { type: 'SMS', date: '2024-05-15', message: 'Your bill is ready.' },
        { type: 'Email', date: '2024-05-01', message: 'Welcome to our service!' },
      ]
    },
    {
      id: 'cust2', name: 'Priya Singh', address: '45, Patel Society, Ahmedabad', phone: '9876512345',
      milkType: 'Cow', litersMorning: 1, litersNoon: 1, pricePerLiter: 70, status: 'Active', startDate: '2023-02-15',
      dailyLog: [
        { date: '2024-05-28', morning: 1, noon: 1, extra: 0, total: 2 },
        { date: '2024-05-29', morning: 1, noon: 1, extra: 0, total: 2 },
        { date: '2024-05-30', morning: 1, noon: 1, extra: 0, total: 2, skip: true },
      ],
      communications: []
    },
    {
      id: 'cust3', name: 'Amit Desai', address: '78, City Center, Vadodara', phone: '9988776655',
      milkType: 'Mix', litersMorning: 3, litersNoon: 0, pricePerLiter: 55, status: 'Paused', startDate: '2023-03-01',
      dailyLog: [],
      communications: []
    },
  ];

  private mockRequests: Request[] = [
    { id: 'req1', customerId: 'cust1', customerName: 'Ramesh Sharma', type: 'Extra Milk', date: '2024-06-20', quantity: 1, status: 'Pending' },
    { id: 'req2', customerId: 'cust2', customerName: 'Priya Singh', type: 'Stop Milk', date: '2024-06-21', status: 'Pending' },
    { id: 'req3', customerId: 'cust1', customerName: 'Ramesh Sharma', type: 'Reduce Qty', date: '2024-06-19', quantity: 0.5, status: 'Fulfilled' },
  ];

  constructor() { }

  /**
   * Retrieves all mock customers.
   * @returns An Observable of an array of Customer objects.
   */
  getCustomers(): Observable<Customer[]> {
    // Simulate API call delay
    return of([...this.mockCustomers]).pipe(
      // For more complex async operations, you might use setTimeout
      // delay(100)
    );
  }

  /**
   * Retrieves a single customer by ID.
   * @param id The ID of the customer to retrieve.
   * @returns An Observable of a Customer object or undefined if not found.
   */
  getCustomer(id: string): Observable<Customer | undefined> {
    return of(this.mockCustomers.find(c => c.id === id));
  }

  /**
   * Retrieves all mock requests.
   * @returns An Observable of an array of Request objects.
   */
  getRequests(): Observable<Request[]> {
    return of([...this.mockRequests]);
  }

  /**
   * Adds a new customer to the mock data.
   * @param newCustomer The customer object to add (without an ID).
   * @returns An Observable of the newly added Customer object (with generated ID).
   */
  addCustomer(newCustomer: Omit<Customer, 'id'>): Observable<Customer> {
    const id = 'cust' + (this.mockCustomers.length + 1);
    const customerWithId: Customer = { ...newCustomer, id, dailyLog: [], communications: [] };
    this.mockCustomers.push(customerWithId);
    console.log("Mock: Added customer", customerWithId);
    return of(customerWithId);
  }

  /**
   * Updates an existing customer in the mock data.
   * @param updatedCustomer The customer object with updated information (must include ID).
   * @returns An Observable of the updated Customer object.
   */
  updateCustomer(updatedCustomer: Customer): Observable<Customer> {
    const index = this.mockCustomers.findIndex(c => c.id === updatedCustomer.id);
    if (index > -1) {
      this.mockCustomers[index] = updatedCustomer;
      console.log("Mock: Updated customer", updatedCustomer);
    }
    return of(updatedCustomer);
  }

  // --- Utility functions (could be part of a separate utility service) ---
  formatDate(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
