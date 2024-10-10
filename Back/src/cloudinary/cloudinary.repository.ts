import { UploadApiResponse,
    v2 
} from "cloudinary";
import toStream = require('buffer-to-stream')
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class CloudinaryRepository{
   
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        try {
            return new Promise(( resolve, reject ) =>{

            const upload = v2.uploader.upload_stream(
               { resource_type: 'image' },
               (error, result) => error ? reject(error) : resolve(result)
           ); 

           toStream(file.buffer).pipe(upload);
            });
        }catch(error){
      console.error('Cloudinary error:', error); 

            throw new ConflictException(error)
        }
   }
}