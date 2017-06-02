import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import { Customer } from '../models/customer.model';
declare var innoway:any,$:any;



@Injectable()
export class AuthService {

  private _customer:any;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  loggedInTest = new Observable<boolean>();

  constructor(
    private router: Router
  ) { 
    this._customer = new innoway.Customer();
    $(this._customer).on(innoway.Customer.events.AuthStateChange,(e,authenticated)=>{
      this.setLoggedIn(authenticated);
    })
  }

  

  handleAuth() {
    if (this._customer && this._customer.user && this._customer.user.Token) {
      window.location.hash = '';
      this.loginWithToken(this._customer.user.Token).then(user => {
        this.setLoggedIn(true);
      }).catch(err => {
        this.setLoggedIn(false);
      });
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['home']);
    }
  }


  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(phone,password){
    return new Promise((resolve,reject)=>{
      this._customer.login(phone,password,(err,data)=>{
        if(err){
          reject(data);
        }else{
          resolve(data);
        }
      });
    })
  }

  loginWithToken(token){
    return new Promise((resolve,reject)=>{
      this._customer.loginWithToken(token,(err,data)=>{
        if(err){
          reject(data);
        }else{
          resolve(data);
        }
      });
    });
  }

  loginWithFacebook(){
    return new Promise((resolve,reject)=>{
      this._customer.loginWithFacebook((err,data)=>{
        if(err){
          reject(data);
        }else{
          resolve(data);
        }
      })
    });
  }

  loginWithGoogle(){
    return new Promise((resolve,reject)=>{
      this._customer.loginWithGoogle((err,data)=>{
        if(err){
          reject(data);
        }else{
          resolve(data);
        }
      })
    });
  }

  logout(){
    this._customer.logout();
    this.router.navigate(['home']);
    this.setLoggedIn(false);
  }

  signUp(user){
    return new Promise((resolve,reject)=>{
      this._customer.signUp(user,(err,data)=>{
        if(err){
          reject(data);
        }else{
          resolve(data);
        }
      })
    })
  }

  signUpWithProvider(provider,token,user){
    return new Promise((resolve,reject)=>{
      this._customer.signUpWithProvider(provider,token,user,(err,data)=>{
        if(err){
          reject(data);
        }else{
          resolve(data);
        }
      })
    })
  }

  get authenticated() {
    // Check if there's an unexpired access token
    return this.loggedIn;
  }

  get userInfo(){
    return this._customer.user;
  }

  get customer() {
    return this._customer;
  }

  get userAvatar(){
    if(!this.userInfo.Avatar || this.userInfo.Avatar === ""){
      return 'assets/images/user.png';
    }else{
      return this.userInfo.Avatar;
    }
    
  }
  
}
