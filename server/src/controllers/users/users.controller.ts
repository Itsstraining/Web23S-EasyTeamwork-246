import { Body, Controller, Post, Get, Query, Param } from '@nestjs/common';
import { UserModel } from 'src/models/users.model';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get('getAllUsers')
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Post('login')
    async signIn(@Body() body: UserModel) {
        return await this.userService.signIn(body);
    }

    @Get(':uid')
    async findByUid(@Param('uid') uid: string) {
        return await this.userService.findUserByUid(uid);
    }
}
