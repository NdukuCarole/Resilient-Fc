import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AuthGuard } from '../auth/authGuard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainDashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [MainDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
