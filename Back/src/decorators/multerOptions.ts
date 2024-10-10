// multer.options.ts
import { MulterModuleOptions  } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';

export const multerOptions: MulterModuleOptions  = {
    limits: {
        fileSize: 10 * 1024 * 1024, 
    },
    fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return callback(new BadRequestException('Tipo de imagen no válida'), false);
        }
        callback(null, true);
    },
};
