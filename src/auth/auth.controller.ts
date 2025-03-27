import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
    ) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const authEmail = this.config.get('TEST_EMAIL');
    const authPwd = this.config.get('TEST_PWD');
    console.log(email)
    console.log(password)
    console.log(authEmail)
    console.log(authPwd)

    if (email === authEmail && password === authPwd) {
      return this.authService.generateToken({ sub: 'admin-id', email });
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
