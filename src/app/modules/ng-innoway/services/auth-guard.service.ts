import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return new Observable<boolean>((ob)=>{
      var checkLogin = this.auth.loggedIn$.subscribe((authenticated)=>{
        if(authenticated) {
          ob.next(true);
        }else{
          this.router.navigate(['registration']);
          ob.next(false);
        }
      })
    });
  }

}

@Injectable()
export class UnAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((ob)=>{
      var checkLogin = this.auth.loggedIn$.subscribe((authenticated)=>{
        if(authenticated) {    
          this.router.navigate(['profile']);    
          ob.next(false);      
        }else{
          ob.next(true);
        }
      })
    });
  }

}