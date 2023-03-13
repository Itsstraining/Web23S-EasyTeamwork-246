import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { TaskModel } from 'src/models/task.modle';
import { Task } from 'src/schemas/task.schema';
import { TaskService } from 'src/services/task/task.service';

@WebSocketGateway({cors: true})
export class TasksGateway {

  @WebSocketServer() server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`client ${client.id} connected`);
  }

  handleDisconnect(client: any) {
    console.log(`client ${client.id} disconnected`);
  }

  @SubscribeMessage('task')
  handleMessage(client: any, payload: any): string {
    const prj_id = payload.project_id;

    this.server.emit('task_' + prj_id, payload);

    return 'Hello world!';
  }
}