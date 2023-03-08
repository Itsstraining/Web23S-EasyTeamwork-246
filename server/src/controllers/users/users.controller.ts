import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UserModel } from 'src/models/users.model';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('login')
    async signIn(@Body() user: UserModel) {
        let temp = await this.userService.findUserById(user.uid);
        console.log(temp);
        if (temp != null) {
            return 'User already exists';
        } else {
            return this.userService.signIn(user)
        }
    }

    @Get('getId')
    getId(@Query() user: UserModel) {
        return this.userService.findUserById(user.uid);
    }
}
