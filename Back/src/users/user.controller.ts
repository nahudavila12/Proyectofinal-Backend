import {
  Controller,
  Get,
  Delete,
  Param,
  InternalServerErrorException,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UuidValidationPipe } from './pipe/uuid-validation.pipe';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':uuid')
  @ApiOperation({ summary: 'Obtener información de un usuario por UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID del usuario', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Información del usuario obtenida con éxito',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getUser(@Param('uuid', UuidValidationPipe) uuid: string) {
    try {
      const user = await this.userService.findByEmail(uuid);

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'Error al obtener el usuario.',
        error.message,
      );
    }
  }

  @Delete('delete/:uuid')
  @ApiOperation({ summary: 'Eliminar un usuario por UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID del usuario', type: 'string' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async deleteUser(@Param('uuid', UuidValidationPipe) uuid: string) {
    try {
      await this.userService.deleteUser(uuid);
      return {
        statusCode: HttpStatus.OK,
        message: 'Usuario eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'Error al eliminar el usuario.',
        error.message,
      );
    }
  }
}
