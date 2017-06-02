import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { RegistrationFormGroup, RegistrationValidateMessages } from '../../forms/registration.group';
import { LoginFormGroup,LoginValidateMessages } from '../../forms/login.group';
import { AuthService } from '../../modules/ng-innoway/services/auth.service';
import { Router } from '@angular/router';
import { overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalUserInfoComponent, UserInfoModalContext} from '../../modals/modal-user-info/modal-user-info.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  frmRegistration:FormGroup;
  frmLogin:FormGroup;
  regisSubmited:Boolean = false;
  loginSubmited:Boolean = false;
  loginCbMessage:string = null;
  regisCbMessage:string = null;
  regisValidMessages;loginValidateMessages;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private modal: Modal
  ) { 

    this.frmRegistration = RegistrationFormGroup(fb);
    this.frmLogin = LoginFormGroup(fb);
    this.regisValidMessages = RegistrationValidateMessages;
    this.loginValidateMessages = LoginValidateMessages;
  }

  ngOnInit() {
  }

  signup(){
    this.regisSubmited = true;
    if(this.frmRegistration.valid){
      var data = {
        phone: this.frmRegistration.get('phone').value,
        password: this.frmRegistration.get('password').value,
        fullName: this.frmRegistration.get('fullName').value,
        email: this.frmRegistration.get('email').value,
      }
      this.authService.signUp(data).then(user => {
        console.log('SUCCESS',user);
        this.router.navigate(['/profile']);
        return;
      }).catch(err =>{
        this.regisCbMessage = err;
        console.error('Authentication Error: ',err);
      })
    }
  }

  login(){
    this.loginSubmited = true;
    if(this.frmLogin.valid){
      var phone = this.frmLogin.get('phone').value;
      var password = this.frmLogin.get('password').value;
      this.authService.login(phone,password).then(user => {
        this.router.navigate(['/profile']);
      }).catch(err => {
        this.loginCbMessage = err;
        console.error('Authentication Error: ',err);
      })
    }
  }

  loginWithFacebook(){
    this.authService.loginWithFacebook().then(user =>{
      setTimeout(()=>{
        this.router.navigate(['/profile']);
      },500);
      // this.router.navigate(['/profile']);
    }).catch(err => {
      this.openUserInfoModal('facebook',err);
    });
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle().then(user =>{
      setTimeout(()=>{
        this.router.navigate(['/profile']);
      },500);
    }).catch(err => {
      this.openUserInfoModal('google',err)
    });
  }

  openUserInfoModal(provider:string,token:string){
    this.modal.open(ModalUserInfoComponent, 
      overlayConfigFactory({ 
        provider: provider, 
        token: token 
      },
      UserInfoModalContext));
  }
}
