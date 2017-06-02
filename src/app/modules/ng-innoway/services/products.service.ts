import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';

declare var innoway:any;
export interface IProduct {
  Id: string;
  CategoryId: string;
  Thumbnail: string;
  Price: number;
  Description: string;
  Status: number;
  Created: number;
  Modified: number;
  Deleted: number;

  getThumbnail();
}

@Injectable()
export class ProductsService {
  public products:Observable<[IProduct]>;
  public categories:Observable<[any]>;

  constructor() { 
    
  }

  public getAllProduct(){
    if(this.products) return this.products;
    this.products =  new Observable<[IProduct]>((observer =>{
      innoway.Customer.getAllProducts((err,data)=>{
        if(err){
          observer.error(data);
        }else{
          observer.next(data);
        }
      })
    }))
    return this.products;
  }
  
  public getAllCategory(){
    if(this.categories) return this.categories;
    this.categories = new Observable<[any]>((observer=>{
      innoway.Employee.getAllCategory((err,data)=>{
        if(err){
          observer.error(data);
        }else{
          observer.next(data);
        }
      })
    }))
    return this.categories;
  }
}
