import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/authenticate';
import * as globalMethods from '../login/globalMethods';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData: {
    phone: string;
    password: string;
    name: string;
    confirmPassword: string;
  } = {
    phone: '',
    password: '',
    name: '',
    confirmPassword: '',
  };

  Status: {
    status_code: number;
    status_message: string;
  } = {
    status_code: 0,
    status_message: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  passwordsMatch() {
    if (
      Number(this.formData.password) !== Number(this.formData.confirmPassword)
    ) {
      this.Status.status_message = 'Passwords Dont Match';
      this.Status.status_code = 1009;
      return true;
    } else {
      return false;
    }
  }



  missingFields() {
    if (
      this.formData.confirmPassword === '' ||
      this.formData.password === '' ||
      this.formData.phone === '' ||
      this.formData.name === ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkAllNonEmptyValues(): boolean {
    for (const key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
        if ((this.formData as any)[key] === '') {
          console.log(`${key} has an empty value`);
          return false;
        }
      }
    }
    return true;
  }

  Register() {
    if (this.missingFields()) {
      this.Status.status_message = 'All Fields are required';
      this.Status.status_code = 1008;
    } else {
      if (this.passwordsMatch()) {
        console.log('error');
      } else {
        const url = 'http://205.209.102.142:5000';
        this.formData.phone = globalMethods.formatPhone(this.formData.phone);
        this.http.post(url + '/register', this.formData).subscribe(
          (data: any) => {
            this.Status.status_code = data.status_code;
            if (data.status_code === 1000) {
              this.Status.status_message = data.message;
            } else {
              this.Status.status_message = data.message;
            }
          },
          (error) => {
            console.error('Error:', error);
            this.Status.status_message = 'Something Went Wrong';
          }
        );
        this.formData.name = ''
        this.formData.confirmPassword = ''
        this.formData.name = ''
        this.formData.phone = ''
      }
    }
  }
  redirectToLoginPage() {
    this.router.navigate(['']);
  }
}
