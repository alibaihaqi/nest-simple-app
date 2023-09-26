import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InsertUserDto, IUpdateUserDto } from './dto';

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
    return this.usersService.insertUser(dto);
  }

  @Put()
  async updateUser(@Body() dto: IUpdateUserDto) {
    return this.usersService.updateUser(dto);
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
