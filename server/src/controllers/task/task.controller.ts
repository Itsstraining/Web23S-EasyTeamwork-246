import { Controller, Get, Query } from '@nestjs/common';
import { TaskService } from 'src/services/task/task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @Get()
    getAll() {
        return this.getAll();
    }

    @Get('/get')
    getById(@Query('id') id: string) {
        return this.taskService.getById(id);
    }
}
