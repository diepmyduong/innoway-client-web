import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { RegistrationFormGroup, RegistrationValidateMessages } from '../../forms/registration.group';
import { LoginFormGroup,LoginValidateMessages } from '../../forms/login.group';
import { AuthService } from '../../modules/ng-innoway/services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
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
    private modal: Modal,
    private route: ActivatedRoute
  ) { 

    this.frmRegistration = RegistrationFormGroup(fb);
    this.frmLogin = LoginFormGroup(fb);
    this.regisValidMessages = RegistrationValidateMessages;
    this.loginValidateMessages = LoginValidateMessages;
    route.params.subscribe(params =>{
      if(params.senderId){
        console.log('SENDER ID',params.senderId);
        localStorage.setItem('demo.innoway.fb.senderId',params.senderId);
      }
    })
  }

  ngOnInit() {
  }

  signup(){
    this.regisSubmited = true;
    if(this.frmRegistration.valid){
      var facebookSenderId = localStorage.getItem("demo.innoway.fb.senderId");

      var data = {
        phone: this.frmRegistration.get('phone').value,
        password: this.frmRegistration.get('password').value,
        fullName: this.frmRegistration.get('fullName').value,
        email: this.frmRegistration.get('email').value,
        facebookSenderId: facebookSenderId
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
      var facebookSenderId = localStorage.getItem("demo.innoway.fb.senderId");
      this.authService.login(phone,password,facebookSenderId).then(user => {
        this.router.navigate(['/profile']);
      }).catch(err => {
        this.loginCbMessage = err;
        console.error('Authentication Error: ',err);
      })
    }
  }

  loginWithFacebook(){
    var facebookSenderId = localStorage.getItem("demo.innoway.fb.senderId");
    this.authService.loginWithFacebook(facebookSenderId).then(user =>{
      setTimeout(()=>{
        this.router.navigate(['/profile']);
      },500);
      // this.router.navigate(['/profile']);
    }).catch(err => {
      if(err.token){
        var facebookProfile = this.authService.customer.facebookProfile;
        this.openUserInfoModal('facebook',err.token,{
          name: facebookProfile.name,
          email: facebookProfile.email,
          uid: facebookProfile.id
        });
      }else{
        this.loginCbMessage = err;
      }
      
    });
  }

  loginWithGoogle(){
    var facebookSenderId = localStorage.getItem("demo.innoway.fb.senderId");
    this.authService.loginWithGoogle(facebookSenderId).then(user =>{
      setTimeout(()=>{
        this.router.navigate(['/profile']);
      },500);
    }).catch(err => {
      console.log('ERROR',err); 
      if(err.token){
        var googleProfile = this.authService.customer.googleProfile;
        this.openUserInfoModal('google',err.token,{
          name: googleProfile.getName(),
          email: googleProfile.getEmail(),
          uid: googleProfile.getId()
        })
      }else{
        this.loginCbMessage = err;
      }
    });
  }

  openUserInfoModal(provider:string,token:string,profile:any){
    this.modal.open(ModalUserInfoComponent, 
      overlayConfigFactory({ 
        provider: provider, 
        token: token ,
        profile: profile
      },
      UserInfoModalContext));
  }
}
