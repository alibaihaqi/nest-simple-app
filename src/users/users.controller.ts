import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InsertUserDto, IUpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.usersService.getUserById(id);
    } catch (err) {
      return err;
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async insertUser(@Body() dto: InsertUserDto) {
    return this.usersService.insertUser(dto);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Body() dto: IUpdateUserDto) {
    return this.usersService.updateUser(dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.usersService.removeUserById(id);
    } catch (err) {
      return err;
    }
  }
}
