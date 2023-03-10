import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ProjectModel } from 'src/models/projects.model';
import { ProjectsService } from 'src/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectService:ProjectsService) { }

    @Get('getAllProjects')
    getAll(){
        return this.projectService.getAll();
    }

    @Get('getProjectById')
    getById(@Query('id') id: string){
        return this.projectService.getById(id);
    }

    @Post('createProject')
    create(@Body() newProject: ProjectModel){
        return this.projectService.create(newProject);
    }

    @Put('updateProject')
    update(@Query('id') id: string, @Body() project: ProjectModel){
        return this.projectService.update(project, id);
    }

    @Delete('deleteProject')
    delete(@Query('id') id: string){
        return this.projectService.delete(id);
    }
}