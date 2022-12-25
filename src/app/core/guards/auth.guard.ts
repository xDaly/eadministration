import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
      const isAuthorized = this.authService.isAuthorized(route.data.allowedRoles);

      if (!isAuthorized) {
          // if not authorized, show access denied message
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      }

      return isAuthorized;
  }



}
