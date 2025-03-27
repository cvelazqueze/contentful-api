import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: { sub: string; email: string }) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
