import { Component, OnInit } from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';
import { BillService,BillStatus } from '../../modules/ng-innoway/services/bill.service';

export class BillDetailModalContext extends BSModalContext {
  public billInfo: any;
}

@Component({
  selector: 'app-modal-bill-detail',
  templateUrl: './modal-bill-detail.component.html',
  styleUrls: ['./modal-bill-detail.component.css']
})
export class ModalBillDetailComponent implements OnInit,CloseGuard, ModalComponent<BillDetailModalContext>{

  context: BillDetailModalContext;
  bill:any;

  constructor(
    public dialog: DialogRef<BillDetailModalContext>,
    private billService: BillService
  ) { 
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    billService.getBillDetail(this.context.billInfo.Id).then(bill =>{
      this.bill = bill;
      console.log(this.bill);
    }).catch(err =>{
      this.closeModal();
    });
  }

  ngOnInit() {
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }

  closeModal(){
    this.dialog.close();
  }

  get isDelevered(){
    return (this.bill.Status !== this.billService.status.NOT_DELIVERING && this.bill.Status !== this.billService.status.UNKNOW);
  }

}
