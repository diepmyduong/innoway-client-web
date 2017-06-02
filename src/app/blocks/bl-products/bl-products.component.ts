import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../modules/ng-innoway/services/products.service';
import { Observable } from 'rxjs/Observable';
import { CardService } from '../../modules/ng-innoway/services/card.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bl-products',
  templateUrl: './bl-products.component.html',
  styleUrls: ['./bl-products.component.css']
})
export class BlProductsComponent implements OnInit {

  @Input() products:Observable<[IProduct]>
  constructor(
    private cardService:CardService,
    private router:Router
  ) { }

  ngOnInit() {

  }

  addToCard(product){
    this.cardService.addToCard(product);
    this.router.navigate(['/profile']);
  }

}
