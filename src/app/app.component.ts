import { Component, ViewContainerRef,OnInit} from '@angular/core';
import { NotifyService } from './modules/ng-innoway/services/notify.service';
import { Router, NavigationEnd,NavigationStart } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isFb = false;

  constructor(
    public notifyService: NotifyService,
    private vcr: ViewContainerRef,
    private router: Router
  ){
    this.notifyService.setViewContainer(vcr);
  }
  ngOnInit() {
      
      this.router.events.subscribe((evt) => {
        
        if( evt instanceof NavigationEnd){
          window.scrollTo(0, 0)
        }else{
          return;
        }
      });
      setTimeout(()=>{
        $('body').addClass('loaded');
      },500);

      
  }

}
