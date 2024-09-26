import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UuidValidationPipe } from './pipe/uuid-validation.pipe';

@Controller('user')
export class UsersController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get('allUsers')
    @HttpCode(200)
    async getAllUsers(page,limit){
        return this.userService.getAllUsers(page,limit)
    }

    getUser(@Param('uuid', UuidValidationPipe) uuid: string) {
        return this.userService.findByEmail(uuid);
      }

    @Post('addUser')
    async addUser(
        @Body() newUser:CreateUserDto
    ){
        return this.userService.addUser(newUser);
    }

    @Delete('delete/:uuid')
    deleteUser(@Param('id', UuidValidationPipe) id: string) {
        return this.userService.deleteUser(id);
      }
}

