import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.value).
      subscribe((res: any) => {
        if (res.token) {
          var decodedHeader = jwt_decode(res.token);
          localStorage.setItem('api_token', res.token);
          localStorage.setItem('user_profile', JSON.stringify(decodedHeader));
          this.router.navigate(['/'])
        }
      }, (err: any) => {
        console.log(err)
      })
  }
}
