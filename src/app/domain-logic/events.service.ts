import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public user$: Subject<User> = new Subject()
  static IS_AUTHORIZED: boolean = false
}
