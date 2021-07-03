import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserInput } from './../user/models/user.inputs';
import { LoginInput } from './models/auth.input';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/models/user.model';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() body: LoginInput,
  ): Promise<{ user: User; access_token: string }> {
    return this.authService.login(body);
  }

  @Post('sign-up')
  async signUp(
    @Body() body: CreateUserInput,
  ): Promise<{ user: User; access_token: string }> {
    return this.authService.signUp(body);
  }
}
