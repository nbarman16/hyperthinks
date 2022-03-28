import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
     private theme_mode = new Subject<string>();

     setMode(mode: string) {
        this.theme_mode.next(mode);
     }

    clearMode() {
        this.theme_mode.next();
    }

    getMode(): Observable<any> {
        return this.theme_mode.asObservable();
    }
}
