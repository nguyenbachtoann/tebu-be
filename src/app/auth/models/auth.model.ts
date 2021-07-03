import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/app/user/models/user.model';

@ObjectType()
export class AuthResponseModel {
  @Field()
  user: Promise<User>;
  @Field()
  accessToken: string;
}
