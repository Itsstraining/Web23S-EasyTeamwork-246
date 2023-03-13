import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({cors: true})
export class TasksGateway {

  @WebSocketServer() server;

  handleConnection(client: any, ...args: any[]) {
    console.log('client connected', client.id);
  }

  handleDisconnect(client: any) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    const prj_id = payload.prj_id;
    console.log('task', payload);
    this.server.emit('task-' + prj_id, payload);
    return 'Hello world!';
  }
}
