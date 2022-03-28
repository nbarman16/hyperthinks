import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard.component';
import { userRoutes } from './user/user-routing.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      ...userRoutes
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
