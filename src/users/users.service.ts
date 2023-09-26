import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { InsertUserDto, IDeleteUser, IUser } from './dto';

@Injectable({})
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<IUser> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return this.generateUserResponse(user);
  }

  async insertUser(dto: InsertUserDto): Promise<IUser> {
    // optional, it'd be great if we hash the password in the database instead of plain text
    const hashPassword = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashPassword,
      },
    });

    return this.generateUserResponse(user);
  }

  async removeUserById(id: string): Promise<IDeleteUser> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: `Success delete user with ID ${id}`,
    };
  }

  generateUserResponse(user): IUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
