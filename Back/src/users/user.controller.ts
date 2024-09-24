import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get('allUsers')
    @HttpCode(200)
    async getAllUsers(){
        return this.userService.getAllUsers()
    }
}
