import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BillService } from '../../modules/ng-innoway/services/bill.service';
import { overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { BillDetailModalContext, ModalBillDetailComponent} from '../../modals/modal-bill-detail/modal-bill-detail.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  private _bills = [];
  bills:Observable<[any]>;
  filterStatus:string;
  searchKey:string = "";
  searchTimeout = 500;
  searchId;
  isSearching = false;
  filterdBills = [];

  public constructor(
    public billService:BillService,
    private modal: Modal
  ) {
    this.bills = billService.getBills();
    this.bills.subscribe(bills =>{
      this._bills = bills;
      console.log(this._bills);
    })
  }

  public ngOnInit():void {
    this.billService.status.PAYED
  }

  openBillDetailModal(bill:any){
    this.modal.open(ModalBillDetailComponent, 
      overlayConfigFactory({ 
        billInfo: bill 
      },
      BillDetailModalContext));
  }

  onSearch(event,isStatusChange?:boolean){
    
    if(this.searchKey == "" && !isStatusChange){
      this.isSearching = false;
      return;
    }
    this.filterStatus = event.target.value;
    console.log('filter',this.filterStatus);
    if(this.searchId) clearTimeout(this.searchId);
    this.searchId = setTimeout(()=>{
      this.filterdBills = this._bills.filter((bill)=>{
        return bill.Code.includes(this.searchKey) && (this.filterStatus === 'all' || this.filterStatus === bill.Status);
    });
      this.isSearching = true;
    },this.searchTimeout)
  }


}
