import { Component, OnInit ,ViewContainerRef, ElementRef,ViewChild,Inject,} from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalOrderComponent, OrderModalContext} from '../../modals/modal-order/modal-order.component';
import { ProductsService } from '../../modules/ng-innoway/services/products.service';
import { NotifyService } from '../../modules/ng-innoway/services/notify.service';
import { CardService } from '../../modules/ng-innoway/services/card.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  categories:Observable<[any]>;
  products:Observable<[any]>;
  cards:Observable<[any]>;
  private _cards = [];
  @ViewChild('productsContainer') private productsContainer:ElementRef;
  constructor(
    private overlay:Overlay,
    private vcRef: ViewContainerRef,
    public modal:Modal,
    private router: Router,
    private productService:ProductsService,
    private pageScrollService: PageScrollService,
    public cardService:CardService,
    public notifyService:NotifyService,
    @Inject(DOCUMENT) private document: any
  ) { 
    this.categories = this.productService.getAllCategory();
    this.products = this.productService.getAllProduct();
    this.cards = this.cardService.getCards();
    this.cards.subscribe(cards =>{
      this._cards = cards;
    })
  }

  ngOnInit() {
    
  }

  openOrderModal(){
    this.modal.open(ModalOrderComponent, overlayConfigFactory({ num1: 2, num2: 3 }, OrderModalContext));
  }

  checkout(){
    if(this._cards.length === 0){
      this.notifyService.showWarning('Bạn chưa chọn mặt hàng nào');
      return;
    }
    this.router.navigate(['/checkout']);
  }

  anchorTo(category){
    var target = '#category_'+category.Id;
    console.log(target);
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({document: this.document, scrollTarget: target, scrollingViews: [this.productsContainer.nativeElement]});
    this.pageScrollService.start(pageScrollInstance);
  }

  addToCard(product){
    this.cardService.addToCard(product);
  }

  decreaseCard(card){
    this.cardService.decreaseCard(card);
  }

}
