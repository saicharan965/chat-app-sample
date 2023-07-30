import { ChatService } from './../../domain-logic/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roomId: any
  message: any
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((data) => {
      console.log(data)
    })

  }

  join(): void {
    this.chatService.joinRoom({
      user: this.roomId,
      room: this.roomId
    });
  }


  protected sendMessage() {
    this.chatService.sendMessage({
      user: "Sass",
      room: this.roomId,
      message: this.roomId
    });
  }
}
