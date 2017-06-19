import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap/index';
import { RegisWithProviderFormGroup, RegistrationValidateMessages } from '../../forms/registration.group';
import { AuthService } from '../../modules/ng-innoway/services/auth.service';
import { Router } from '@angular/router';
export class UserInfoModalContext extends BSModalContext {
  public provider: string;
  public token: string;
  public profile: any;
}

@Component({
  selector: 'app-modal-user-info',
  templateUrl: './modal-user-info.component.html',
  styleUrls: ['./modal-user-info.component.css']
})
export class ModalUserInfoComponent implements OnInit,CloseGuard, ModalComponent<UserInfoModalContext> {

  context: UserInfoModalContext;
  frmRegistration:FormGroup;
  regisSubmited:Boolean = false;
  regisCbMessage:string = null;
  regisValidMessages;

  constructor(
    private fb: FormBuilder,
    public dialog: DialogRef<UserInfoModalContext>,
    private authService: AuthService,
    private router: Router
  ) { 
    this.context = dialog.context;
    this.frmRegistration = RegisWithProviderFormGroup(fb);
    this.regisValidMessages = RegistrationValidateMessages;
    dialog.setCloseGuard(this);
  }

  ngOnInit() {
    if(this.context.profile){
      this.frmRegistration.controls['fullName'].setValue(this.context.profile.name);
      this.frmRegistration.controls['email'].setValue(this.context.profile.email);
    }
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

  signup(){
    this.regisSubmited = true;
    if(this.frmRegistration.valid){
      var facebookSenderId = localStorage.getItem("demo.innoway.fb.senderId");
      var data = {
        phone: this.frmRegistration.get('phone').value,
        fullName: this.frmRegistration.get('fullName').value,
        email: this.frmRegistration.get('email').value,
        facebookSenderId: facebookSenderId
      }
      this.authService.signUpWithProvider(this.context.provider,this.context.profile.uid,data).then(user => {
        console.log('SUCCESS',user);
        this.router.navigate(['/profile']);
        this.closeModal();
        return;
      }).catch(err =>{
        this.regisCbMessage = err;
        console.error('Authentication Error: ',err);
      })
    }
  }

}
