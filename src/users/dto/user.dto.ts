import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InsertUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface IDeleteUser {
  success: boolean;
  message: string;
}
