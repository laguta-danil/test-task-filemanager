import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { StoreFileCommand } from './use-cases/commands/store-file.handler';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateFileNameDto } from './dto/update-file-name.dto';

@Controller('file-management')
export class FileManagementController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  storeFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.commandBus.execute(new StoreFileCommand(file));
  }

  @Get()
  findAll() {
    return this.commandBus.execute(1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandBus.execute(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileManagementDto: UpdateFileNameDto,
  ) {
    return this.commandBus.execute(updateFileManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(+id);
  }
}
