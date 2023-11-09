import { Component } from '@angular/core';
import * as globalMethods from './globalMethods';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/authenticate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData: {
    phone: string;
    password: string;
    f13: string;
    f11: string;
    f12: string;
    mti: string;
    f68: string;
    f2: string;
    f37: string;
    f3: string;
    f7: string;
    f56: string;
  } = {
    phone: '',
    password: '',
    f13: globalMethods.getHourMinute(),
    f12: globalMethods.getHourMinuteSecond(),
    mti: '0100',
    f11: globalMethods.getMinuteSecond(),
    f68: 'Login Request',
    f2: '',
    f37: globalMethods.createRefno(),
    f3: '101010',
    f7: globalMethods.getTransactionDate(),
    f56: '',
  };

  Status: {
    status_code: number;
    status_message: string;
  } = {
    status_code: 0,
    status_message: '',
  };
  Token: {
    token: Date;
  } = {
    token: new Date('2023-01-01T00:00:00Z'),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.check() && !this.isTokenExpired()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['']);
    }
  }
  isTokenExpired(): boolean {
    if (!this.Token.token || new Date() > new Date(this.Token.token)) {
      return true;
    }
    return false;
  }

  changeRoute() {
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }

  postData() {
    const url = 'http://205.209.102.142:5000';

  

    this.formData.f2 = globalMethods.formatPhone(this.formData.phone);
    this.formData.f56 = this.formData.password;

    this.http
      .post(url + '/login', this.formData)
      .subscribe(
        (data: any) => {
          this.Status.status_code = data.status_code;
          if (data.status_code === 1000) {
            this.Status.status_message = data.message;
            this.Token.token = data.data.tokenExpiration;
            localStorage.setItem('token', data.data.token);

            this.changeRoute();
          } else {
            this.Status.status_message = data.message;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.Status.status_message = 'Something Went Wrong';
        }
      );
  }
}
