// import { 
//     Controller, 
//     Param, 
//     UploadedFile,
//     Post, 
//     ParseUUIDPipe,
//     UseInterceptors,
//     ParseFilePipe,
//     MaxFileSizeValidator,
//     FileTypeValidator,
//     UseGuards
// } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';

// @ApiTags('file-upload')
// @ApiBearerAuth()
// @Controller('file-upload')
// export class FileUploadController {
//     constructor(
//         private readonly cloudinaryServie: CloudinaryService
//     ){}

//     @Post('uploadImage/:id')
//     @UseInterceptors(FileInterceptor('file'))
//     @ApiOperation({ summary: 'Subir una imagen para un producto (JPEG, JPG, PNG)' })
//     @ApiConsumes('multipart/form-data')
//     @ApiBody({
//         schema: {
//             type: 'object',
//             properties: {
//                 file: {
//                     type: 'string',
//                     format: 'binary',
//                 }
//             },
//         },
//     })
//     upLoaderImage(
//         @Param('id', ParseUUIDPipe) productId: string,
//         @UploadedFile( new ParseFilePipe({
//             validators:[
//                 new MaxFileSizeValidator({
//                     maxSize: 2000000,
//                     message: 'Tamaño de archivo excedido'
//                 }),
//                 new FileTypeValidator({
//                     fileType: /jpeg|jpg|png/
//                 })
//             ]
//         })) file: Express.Multer.File
//     ){
//         return this.cloudinaryServie.uploadImage(productId, file);
//     }
// }
