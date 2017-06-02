import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
declare var innoway:any;

@Injectable()
export class PromotionService {

  promotions:Observable<[any]>;

  constructor(
    private authService:AuthService
  ) { }

  getPromotions(){
    if(this.promotions) return this.promotions;
    this.promotions = new Observable<[any]>(ob=>{
      this.authService.customer.getPromotions((err,data)=>{
        if(err){
          ob.error(err);
        }else{
          ob.next(data);
        }
      })
    });
    return this.promotions;
  }

}
