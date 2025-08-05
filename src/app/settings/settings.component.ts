import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  milkPrices: { [key: string]: number } = { Pure: 60, Mix: 55, Cow: 70 };
  showBackupModal: boolean = false;
  showRestoreModal: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handlePriceChange(type: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.milkPrices[type] = parseFloat(value) || 0;
  }

  handleSavePrices(): void {
    console.log('Saving new milk prices:', this.milkPrices);
    alert('Milk prices updated successfully!');
  }

  handleBackup(): void {
    console.log('Initiating backup...');
    alert('Data backup initiated (mock action).');
    this.showBackupModal = false;
  }

  handleRestore(): void {
    console.log('Initiating restore...');
    alert('Data restore initiated (mock action).');
    this.showRestoreModal = false;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
