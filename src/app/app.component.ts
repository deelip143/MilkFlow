import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'milk-delivery-angular';

  // In a real Angular app, authentication state would be managed via a service.
  // For this example, we'll assume a simple flag for display.
  isLoggedIn: boolean = false; // Set to true after successful login

  constructor(private router: Router) {}

  // This method could be called from the LoginComponent upon successful login
  onLoginSuccess(): void {
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }

  // Example logout (optional, for demonstration)
  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
