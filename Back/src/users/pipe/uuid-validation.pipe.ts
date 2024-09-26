import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { IsUUID} from 'class-validator';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  async transform(value: any) {
    if (!IsUUID(value)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return value;
  }
}