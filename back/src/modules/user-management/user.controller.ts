import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommandBus } from '@nestjs/cqrs';

@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.commandBus.execute(1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandBus.execute(1);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(1);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(1);
  }
}
