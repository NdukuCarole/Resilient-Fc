import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/authenticate';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {
  constructor(private authService: AuthService) {}
  Logout() {
    this.authService.logout()
  }

}
