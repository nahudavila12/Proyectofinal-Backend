import { 
    Controller, 
    Param, 
    ParseUUIDPipe ,
    Body,
    Put,
    Post
} from '@nestjs/common';
import { CreateOwnerDto } from 'src/dtos/createOwner.dto';
import { OwnerService } from './owner.service';


@Controller('owners')
export class OwnerController {
    constructor(
        private readonly ownerService: OwnerService
    ){}

    @Post('addOwner/:id')
    async addOwner(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() newOwner: CreateOwnerDto
    ){
        return await this.ownerService.addOwner(id, newOwner)
    }
}
