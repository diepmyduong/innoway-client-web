import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

declare var innoway:any,$:any;

export interface BillStatus {
  DELETED:string;
  NOT_DELIVERING:string;
  WAITING:string;
  DELIVERING:string;
  PAYED:string;
  UNKNOW:string;
}

@Injectable()
export class BillService {
  bills:Observable<[any]>;
  status:BillStatus;

  constructor(
    private authService:AuthService,
  ) { 
    this.status = innoway.Customer.billStatus;
  }

  getBills(){
    if(this.bills) return this.bills;
    this.bills = new Observable(ob=>{
      this.authService.customer.getBills((err,data)=>{
        if(err){
          ob.error(data);
        }else{
          ob.next(data);
        }
      })
    })
    return this.bills;
  }

  getBillDetail(billId){
    return new Promise((resolve,reject)=>{
      this.authService.customer.getBillDetail(billId,(err,data)=>{
        if(err){
          reject(data);
        }else{
          resolve(data);
        }
      });
    })
  }

}
