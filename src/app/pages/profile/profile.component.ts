import { Component, OnInit ,ViewContainerRef, ElementRef,ViewChild,Inject,NgZone} from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalOrderComponent, OrderModalContext} from '../../modals/modal-order/modal-order.component';
import { ProductsService } from '../../modules/ng-innoway/services/products.service';
import { NotifyService } from '../../modules/ng-innoway/services/notify.service';
import { CardService } from '../../modules/ng-innoway/services/card.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';

declare var $:any,MessengerExtensions:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  categories:Observable<[any]>;
  products:Observable<[any]>;
  cards:Observable<[any]>;
  isOnCardArea = new BehaviorSubject<boolean>(false) ;

  private _cards = [];
  @ViewChild('productsContainer') private productsContainer:ElementRef;
  constructor(
    private overlay:Overlay,
    private vcRef: ViewContainerRef,
    public modal:Modal,
    private router: Router,
    private route:ActivatedRoute,
    private productService:ProductsService,
    private pageScrollService: PageScrollService,
    public cardService:CardService,
    public notifyService:NotifyService,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: any
  ) { 
    this.categories = this.productService.getAllCategory();
    this.products = this.productService.getAllProduct();
    this.cards = this.cardService.getCards();
    this.cards.subscribe(cards =>{
      this._cards = cards;
    })
    route.params.subscribe(params =>{
      if(params.senderId){
        console.log('SENDER ID',params.senderId);
        localStorage.setItem('demo.innoway.fb.senderId',params.senderId);
      }
    })
  }
  ngOnInit() { 
    var $scrollCardBtn =  $("#scroll-to-card");
    var $scrollCategoryBtn = $("#scroll-to-category");
    var $card = $('#card');
    var $category = $('#category');
    $scrollCardBtn.click(()=>{
      $('html, body').animate({ 
          scrollTop: $card.offset().top - 70
      }, 1000);
    })
    $scrollCategoryBtn.click(()=>{
      $('html, body').animate({
          scrollTop: $category.offset().top - 70
      }, 1000);
    })
    
    $(window).scroll(function() {
      var chT = $category.offset().top,
          chH = $category.outerHeight();
      var hT = $card.offset().top,
          hH = $card.outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
      if (wS > (hT+hH-wH)){
        $scrollCardBtn.addClass('hide');
      }else{
        $scrollCardBtn.removeClass('hide');
      }
      if(wS > (chT+chH)){
        $scrollCategoryBtn.removeClass('hide');
      }else{
        $scrollCategoryBtn.addClass('hide');
      }
    });

    $("#scroll-to-card").click((e)=>{ 
      setTimeout(()=>{
        window.close();
      },2000);
    });
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
    $('html, body').animate({
        scrollTop: $(target).offset().top - 70
    }, 1000);
  }

  addToCard(product){
    this.cardService.addToCard(product);
  }

  decreaseCard(card){
    this.cardService.decreaseCard(card);
  }

}
