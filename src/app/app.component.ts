import { Component, ViewContainerRef,OnInit} from '@angular/core';
import { NotifyService } from './modules/ng-innoway/services/notify.service';
import { Router, NavigationEnd } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    public notifyService: NotifyService,
    private vcr: ViewContainerRef,
    private router: Router
  ){
    this.notifyService.setViewContainer(vcr);
  }

  ngOnInit() {
      this.router.events.subscribe((evt) => {
          console.log('ROUTE EVENT',evt)
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0)
      });
      setTimeout(()=>{
        $('body').addClass('loaded');
      },1000);
      
  }

}
