import { CreateUserInput } from 'src/app/user/models/user.inputs';
import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';
import { LoginInput } from './models/auth.input';
import { UserService } from './../user/user.service';
import { jwtSecret } from './auth.constant';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class AuthService {
  saltRounds = 10;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> | null {
    const user = this.userService.getByEmail(email);

    if (!(await user)) {
      return null;
    }

    const dbPassword = (await user).password;
    const hashedPassword = Md5.hashStr(password);

    const isValidPassword = hashedPassword === dbPassword;

    return isValidPassword ? user : null;
  }

  async signUp(
    account: CreateUserInput,
  ): Promise<{ user: User; access_token: string }> {
    const payload = {
      email: account.email,
      role: account.role,
    };

    const user = await this.userService.create(account);

    return { user, access_token: this.jwtService.sign(payload) };
  }

  allowRole(user: User, allowRoles: string[]): void {
    if (!user) {
      throw new Error('Can not get user for permission');
    }

    const match = allowRoles.includes(user.role);

    if (!match) {
      throw new ForbiddenException();
    }
  }

  getOnly(dbUser: User, currentUser: User, allowRoles: string[]): void {
    if (!currentUser || !dbUser) {
      throw new Error('Can not get user to compare permission!');
    }

    const allow = allowRoles.includes(currentUser.role);
    if (allow) {
      const match = dbUser._id == currentUser._id;
      if (!match) {
        throw new ForbiddenException();
      }
    }
  }

  async login(
    account: LoginInput,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.userService.getByEmail(account.email);

    const payload = {
      email: account.email,
      role: user.role,
    };

    // user.password = null;

    return { user, access_token: this.jwtService.sign(payload) };
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
