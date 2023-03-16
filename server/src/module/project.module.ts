import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from 'src/controllers/projects/projects.controller';
import { Project, ProjectSchema } from 'src/schemas/projects.schema';
import { User, UserSchema } from 'src/schemas/users.schema';
import { ProjectsService } from 'src/services/projects/projects.service';
import { UsersModule } from './users.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => UsersModule),
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectModule { }
