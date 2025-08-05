import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerProfileComponent } from './customers/customer-profile/customer-profile.component';
import { CustomerRequestComponent } from './requests/customer-request/customer-request.component';
import { DailyDeliveryEntryComponent } from './delivery/daily-delivery-entry/daily-delivery-entry.component';
import { BillingComponent } from './billing/billing.component';
import { ReportsComponent } from './reports/reports.component';
import { AddEditCustomerComponent } from './customers/add-edit-customer/add-edit-customer.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customer-profile/:id', component: CustomerProfileComponent }, // Parameter for customer ID
  { path: 'delivery-entry', component: DailyDeliveryEntryComponent },
  { path: 'requests', component: CustomerRequestComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'add-edit-customer', component: AddEditCustomerComponent },
  { path: 'add-edit-customer/:id', component: AddEditCustomerComponent }, // For editing existing customer
  { path: 'settings', component: SettingsComponent },
  // Wildcard route for any other invalid routes
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
