import { Component, OnInit } from '@angular/core';
import { ProductsService , IProduct } from '../../modules/ng-innoway/services/products.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Observable<[IProduct]>;

  constructor(
    public productsService: ProductsService,
  ) { 
  }

  ngOnInit() {
    this.products = this.productsService.getAllProduct();
  }

}
