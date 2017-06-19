import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

declare var innoway:any,$:any;

@Injectable()
export class CardService {

  cards:Observable<[any]>;
  total:number;
  constructor(
    private authService:AuthService,
    private notifyService:NotifyService
  ) {
  }
  public getCards(){
    this.cards = new Observable<[any]>(ob =>{
      $(innoway.Customer).on(innoway.Customer.events.CardsChange,(e,cb)=>{
        this.total = 0;
        cb.data.forEach(card =>{
          this.total += card.Quantity*card.Price;
        })
        ob.next(cb.data);
      })
      innoway.Customer.getCards();
    })
    
    return this.cards;
  }

  public addToCard(product){
    innoway.Customer.addToCard(product);
    this.notifyService.showSuccess('Đã thêm vào giỏ hàng');
  }

  public decreaseCard(product){
    innoway.Customer.decreaseCard(product);
  }

  public clearCard(){
    innoway.Customer.clearCard();
  }

  public order(data){
    return new Promise((resolve,reject)=>{
      this.authService.customer.sendBill(data,(err,result)=>{
        if(err){
          reject(result);
        }else{
          this.clearCard();
          resolve(result);
        }
      });
    });
  }

}
