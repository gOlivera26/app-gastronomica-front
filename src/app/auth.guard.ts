import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    console.log('AuthGuard is being executed.');
    
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
      return true;
    } else {
      console.log('Redirecting to login page.');
      return this.router.parseUrl('/login');
    }
  }
}
