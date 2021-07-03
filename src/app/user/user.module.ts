import { AuthModule } from './../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './models/user.model';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
