import { Component, inject, PLATFORM_ID } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'apollo-ng-hydration-issue-repro-socket-io',
  template: ``,
  standalone: true,
})
export class SocketIoComponent {
  readonly socket!: Socket;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.socket = io('ws://localhost:80/events');
    }
  }
}
