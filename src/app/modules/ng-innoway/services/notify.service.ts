import { Injectable,ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';


export class NotifyToastOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass = 'toast-top-right';
  maxShown = 2;
  toastLife = 1000;
}

@Injectable()
export class NotifyService {

  constructor(
    public toastr: ToastsManager
  ) {
  }

  setViewContainer(vcr:ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess(mess:string,title:string = null) {
    return this.toastr.success(mess,title);
  }

  showError(mess:string,title:string = null) {
    return this.toastr.error(mess, title);
  }

  showWarning(mess:string,title:string = null) {
    return this.toastr.warning(mess, title);
  }

  showInfo(mess:string,title:string = null) {
    return this.toastr.info(mess,title);
  }
}
