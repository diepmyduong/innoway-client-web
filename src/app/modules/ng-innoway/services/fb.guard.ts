import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class FbGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private router: Router) {}
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if(currentState.url.includes('/fb/') && !nextState.url.includes('/fb/')){
      this.router.navigate(['/fb'+nextState.url]);
      return false;
    }
    return true;
  }
}
