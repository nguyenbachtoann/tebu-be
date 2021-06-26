import { Field, InputType } from '@nestjs/graphql';

/**
 * @InputType define an Input Type that can use as an input with GraphQL
 */

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
