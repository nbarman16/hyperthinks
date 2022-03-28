import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hyperthinks';
  constructor(public authService: AuthService, 
    private router: Router){
      if(!localStorage.getItem('user_profile')){
          this.router.navigate(['/login'])
      }
  } 
}
