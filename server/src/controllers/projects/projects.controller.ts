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

    @Get('all/user/:id')
    async getAllByUserId(@Param('id') id: string) {
        return await this.projectService.getAllByUserId(id);
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

    @Put('invite/:email')
    async addMember(@Body() project: ProjectDocument,@Param('email') email: string,
    ) {
        console.log(email);
        return await this.projectService.inviteMember(email, project);
    }

    @Put('accept/:id')
    async acceptRequest(
        @Body() project: ProjectDocument,
        @Param('id') _id: string,
    ) {
        return await this.projectService.acceptRequest(_id, project);
    }

    @Get('request/:id')
    async requestJoin(@Param('id') _id: string) {
        console.log(`requesting to join project for ${_id}`);
        return await this.projectService.requestJoin(_id);
    }
}