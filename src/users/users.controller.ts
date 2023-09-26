import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { InsertUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  insertUser(@Body() dto: InsertUserDto) {
    console.log({ dto });
    return this.usersService.insertUserResponse();
  }
}
