import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './store-file.dto';

export class UpdateFileNameDto extends PartialType(CreateFileDto) {}
