import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { TaskModel } from 'src/models/task.modle';
import { TaskService } from 'src/services/task/task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @Get()
    getAll() {
        return this.taskService.getAll();
    }

    @Get('/ID')
    getById(@Query('id') id: string) {
        return this.taskService.getById(id);
    }

    @Get('/project')
    getByPrjId(@Query('id') id: string) {
        return this.taskService.getByPrjId(id);
    }

    @Post("/create")
    create(@Body() task: TaskModel) {
        return this.taskService.create(task);
    }

    @Put("/update")
    update(@Query('id') id: string, @Body() task: TaskModel) {
        return this.taskService.update(task, id);
    }

    @Delete("/delete")
    delete(@Query('id') id: string) {
        return this.taskService.delete(id);
    }
}
