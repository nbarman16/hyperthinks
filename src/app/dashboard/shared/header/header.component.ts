import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  theme_mode: string = "day_theme";
  constructor(private router: Router,
    private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  gotoPage(url: string){
      this.router.navigate([url]);
  }

  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  onChangeMode($event : any){
      this.theme_mode = $event.checked ? 'theme_night': '';
      document.getElementById('body-pd')?.classList.toggle('theme_night');
      this.themeService.setMode(this.theme_mode);
  }
}
