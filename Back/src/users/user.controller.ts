import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';

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

    @Put('addUser')
    async addUser(
        @Body() newUser:CreateUserDto
    ){
        return this.userService.addUser(newUser);
    }
}
