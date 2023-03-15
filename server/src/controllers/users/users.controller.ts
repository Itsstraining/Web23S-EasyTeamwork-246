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
    async signIn(@Body() user: UserModel) {
        let temp = await this.userService.findUserById(user.uid);

        if (temp != null) {
            return 'User already exists';
        } else {
            return this.userService.signIn(user)
        }
    }

    @Get('getId/:id')
    async getId(@Param('id') id: string) {
        return await this.userService.findUserById(id);
    }
}
