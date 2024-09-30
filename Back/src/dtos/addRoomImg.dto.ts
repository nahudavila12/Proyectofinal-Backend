import { IsString, IsArray } from 'class-validator';

export class CreateRoomImgDto {
    
    @IsArray()
    @IsString({ each: true }) 
    img?: string[]; 

}