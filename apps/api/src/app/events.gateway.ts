import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(80, {
  cors: {
    origin: '*',
  },
  namespace: 'events',
})
export class EventsGateway implements OnGatewayConnection {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  handleConnection(client: any) {
    console.log(`Client: ${!!client}`);
  }
}
