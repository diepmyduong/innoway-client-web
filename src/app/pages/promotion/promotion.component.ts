import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../../modules/ng-innoway/services/promotion.service';
import { NotifyService } from '../../modules/ng-innoway/services/notify.service';
import { Observable } from 'rxjs/Observable';

declare var Clipboard:any;

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotions:Observable<[any]>;

  constructor(
    public promotionService:PromotionService,
    public notifyService:NotifyService
  ) { }

  ngOnInit() {
    this.promotions = this.promotionService.getPromotions();
    this.promotions.subscribe(pr=>{
      console.log(pr);
    })
    var clipboard = new Clipboard('.copy-to-clipboard');
    clipboard.on('success', (function(e) {
        this.notifyService.showSuccess('Đã lưu mã vào Clipboard');
    }).bind(this));

    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
  }

}
