import { Field, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

/**
 * @InputType define an Input Type that can use as a input with GraphQL
 */

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  gender: number;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  role: string;

  // TODO: add Team
  // @Field(() => [String], { nullable: true })
  // hobbies?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class ListUserInput {
  @Field(() => String)
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  // TODO: add Team
  // @Field(() => [String], { nullable: true })
  // hobbies?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  role?: string;

  // TODO: add Team
  // @Field(() => [String], { nullable: true })
  // hobbies?: MongooseSchema.Types.ObjectId[];
}
