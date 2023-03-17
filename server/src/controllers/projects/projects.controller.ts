import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Project } from 'src/schemas/projects.schema';
import { ProjectsService } from 'src/services/projects/projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) { }

    @Get('getAllProjects')
    async getAllProject() {
        return await this.projectService.getAllProject();
    }

    @Get('getProjectById/:id')
    async getProjectById(@Param('id') id: string) {
        return await this.projectService.getProjectById(id);
    }

    @Post('createProject')
    async createProject(@Body() newProject: Project) {
        return await this.projectService.createProject(newProject);
    }

    @Put('updateProject')
    async updateProject(@Query('id') id: string, @Body() project: Project) {
        return await this.projectService.updateProject(project, id);
    }

    @Delete('deleteProject')
    async deleteProject(@Query('id') id: string) {
        return await this.projectService.deleteProject(id);
    }
}