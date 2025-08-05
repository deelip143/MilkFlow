import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerProfileComponent } from './customers/customer-profile/customer-profile.component';
import { AddEditCustomerComponent } from './customers/add-edit-customer/add-edit-customer.component';
import { DailyDeliveryEntryComponent } from './delivery/daily-delivery-entry/daily-delivery-entry.component';
import { CustomerRequestComponent } from './requests/customer-request/customer-request.component';
import { BillingComponent } from './billing/billing.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerProfileComponent,
    AddEditCustomerComponent,
    DailyDeliveryEntryComponent,
    CustomerRequestComponent,
    BillingComponent,
    ReportsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
