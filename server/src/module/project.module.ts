import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from 'src/controllers/projects/projects.controller';
import { Project, ProjectSchema } from 'src/schemas/projects.schema';
import { ProjectsService } from 'src/services/projects/projects.service';
import { InvitationModule } from './invitation.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectModule { }
