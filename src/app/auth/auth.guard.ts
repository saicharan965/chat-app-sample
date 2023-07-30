import { EventsService } from './../domain-logic/events.service';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDetails = localStorage.getItem('userDetails')
    const isAuthorized = EventsService.IS_AUTHORIZED
    return (userDetails !== null || userDetails !== undefined || isAuthorized)
  }
}
