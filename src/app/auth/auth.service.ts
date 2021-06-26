import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';
import { LoginInput } from './models/auth.input';
import { UserService } from './../user/user.service';
import { jwtSecret } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> | null {
    const user = this.userService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isValidPassword = password === (await user).password;
    return isValidPassword ? user : null;
  }

  async login(account: LoginInput): Promise<{ access_token: string }> {
    const payload = {
      email: account.email,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = this.userService.getByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get user from token');
    }

    return user;
  }
}
