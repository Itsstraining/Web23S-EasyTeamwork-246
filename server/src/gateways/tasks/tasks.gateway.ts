import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway( {cors: true} )
export class TasksGateway {

  @WebSocketServer() server;

  handleConnection(client: any, ...args: any[]){
    console.log(`${client.id} has connected`);
  }

  handleDisConnect(client: any){
    console.log(`${client.id} has disconnected`);
  }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   const prjId = payload.project_id;
  //   console.log("message-", prjId, payload);
  //   this.server.emit("message-" + prjId, payload);
  //   return 'Hello world!';
  // }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string{
    const test_id = payload.project_id;
    console.log("message-", payload);
    this.server.emit('message-' + test_id, payload);
    return "test socket";
  }
}