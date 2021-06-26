import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginInput } from './models/auth.input';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginInput): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }
}
