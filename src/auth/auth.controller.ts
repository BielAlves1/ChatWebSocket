import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.generateToken(user);
  }
}
