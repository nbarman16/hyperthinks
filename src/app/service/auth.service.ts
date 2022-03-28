import { Injectable } from '@angular/core';
import { Userlogin, User } from '../login/user.model';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http/http';

import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) { 
        
  }
  
   isLogin():boolean {
    if(localStorage.getItem('user_profile')){
      return true;
    }
    return false;
  }

  login(userlogin: Userlogin){
       return this.apiService.post('/login', userlogin) as Observable<any>;
  }

  getCovid(){
    return this.apiService.get('/covid-report') as Observable<any>;
  }
}
