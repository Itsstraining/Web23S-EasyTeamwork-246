import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Project,ProjectDocument } from 'src/schemas/projects.schema';
import { ProjectsService } from 'src/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) { }

    @Get('getAllProjects')
    getAll() {
        return this.projectService.getAll();
    }

    @Get('getProjectById')
    getById(@Query('id') id: string) {
        return this.projectService.getById(id);
    }

    @Post('createProject')
    async create(@Body() newProject: Project) {
        return await this.projectService.create(newProject);
    }

    @Put('updateProject')
    update(@Query('id') id: string, @Body() project: Project) {
        return this.projectService.update(project, id);
    }

    @Delete('deleteProject')
    delete(@Query('id') id: string) {
        return this.projectService.delete(id);
    }
}