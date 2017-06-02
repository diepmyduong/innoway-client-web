import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/ng-innoway/services/auth.service';
import { Router,NavigationEnd } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-bl-header',
  templateUrl: './bl-header.component.html',
  styleUrls: ['./bl-header.component.css']
})
export class BlHeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            $('#mainNavbarCollapse').removeClass('in');
        }
    });
  }

  logout(){
    this.authService.logout();
  }

}
