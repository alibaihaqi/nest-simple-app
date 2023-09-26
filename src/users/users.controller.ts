import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InsertUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.usersService.getUserById(id);
    } catch (err) {
      return err;
    }
  }

  @Post()
  async insertUser(@Body() dto: InsertUserDto) {
    try {
      return this.usersService.insertUser(dto);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.usersService.removeUserById(id);
    } catch (err) {
      return err;
    }
  }
}
