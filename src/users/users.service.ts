import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { InsertUserDto, IDeleteUser, IUser } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<IUser> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
      // Select is used to choose selected field to be return
      select: {
        id: true,
        name: true,
        email: true,
        password: true, // Better don't expose the password
      },
    });
  }

  async insertUser(dto: InsertUserDto): Promise<IUser> {
    // optional, it'd be great if we hash the password in the database instead of plain text
    const hashPassword = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashPassword, // Better don't expose the password
        },
        // Select is used to choose selected field to be return
        select: {
          id: true,
          name: true,
          email: true,
          password: true, // Better don't expose the password
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is taken');
        }
      }
      throw error;
    }
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
}
