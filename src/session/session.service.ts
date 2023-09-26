import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Since we don't logic requirements but need session,
  // We generate 1 endpoint to generate session
  async generateSession() {
    return {
      accessToken: await this.jwt.signAsync(
        {},
        {
          expiresIn: '15m',
          secret: this.config.get('JWT_SECRET'),
        },
      ),
    };
  }
}
