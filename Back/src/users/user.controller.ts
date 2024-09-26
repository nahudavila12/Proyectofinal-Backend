import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    Param, 
    ParseUUIDPipe, 
    Post, 
    Put, 
    Query,
    Delete 
} from '@nestjs/common';
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
        return await this.userService.getAllUsers(page, limit)
    }

    @Post('addUser')
    @HttpCode(201)
    async addUser(
        @Body() newUser:CreateUserDto
    ){
        return await this.userService.addUser(newUser);
    }

    @Delete('deleteUser/:uuid')
    @HttpCode(204)
    async deleteUser(
        @Param('uuid', ParseUUIDPipe) uuid:string
    ){
        return await this.userService.deleteUser(uuid)
    }
}

