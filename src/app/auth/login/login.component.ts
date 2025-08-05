import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  mobile: string = '';
  otp: string = '';
  otpSent: boolean = false;
  message: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleSendOtp(): void {
    if (this.mobile.length === 10) {
      this.message = 'OTP sent to ' + this.mobile;
      this.otpSent = true;
    } else {
      this.message = 'Please enter a valid 10-digit mobile number.';
    }
  }

  handleLogin(): void {
    if (this.mobile === '9876543210' && this.otp === '1234') {
      // Simulate successful login and navigate
      this.router.navigate(['/dashboard']);
    } else {
      this.message = 'Invalid mobile number or OTP.';
    }
  }
}
