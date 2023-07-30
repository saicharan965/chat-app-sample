import { Subject, takeUntil } from 'rxjs';
import { EventsService } from './../../domain-logic/events.service';
import { ChatService } from './../../domain-logic/chat.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../domain-logic/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject()
  private user: User = JSON.parse(localStorage.getItem('userDetails') as string) as User
  message: string = ''

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.joinRoom({ user: this.user.userName, room: this.user.phoneNumber })
    this.chatService.getMessage().pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      console.log(data)
    })
  }


  protected sendMessage() {
    this.chatService.sendMessage({
      user: this.user.userName,
      room: this.user.phoneNumber,
      message: this.message
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
