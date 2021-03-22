import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../../shared/notification/services/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly notificationService: NotificationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authService.isLoggeIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    this.notificationService.notify(NotificationType.ERROR, `Necesitas iniciar sesion para aceder a esta pagina`.toUpperCase());
    return false;
  }
}
