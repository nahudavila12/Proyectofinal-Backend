import { Body, Controller, Get, HttpCode, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Controller('user')
export class UsersController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get('allUsers')
    @HttpCode(200)
    async getAllUsers(
        @Query('page')page = 1,
        @Query('limit')limit = 10
    ){
        return this.userService.getAllUsers(page, limit)
    }

    @Put('addUser')
    async addUser(
        @Body() newUser:CreateUserDto
    ){
        return this.userService.addUser(newUser);
    }

    //@Put('userRol')
}
