import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { socketData } from './models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket!: Socket;
  private socketEndpoint: string = environment.SOCKET_ENDPOINT
  constructor() {
    this.socket = io(this.socketEndpoint)
  }

  joinRoom(data: socketData): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: socketData): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<socketData> {
    return new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: string | null = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: socketData) {
    localStorage.setItem('chats', JSON.stringify(data));
  }
}
