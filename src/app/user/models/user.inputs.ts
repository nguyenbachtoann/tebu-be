import { Field, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

/**
 * @InputType define a Input Type that can use as a input with GraphQL
 */

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  address: string;

  @Field(() => [String], { nullable: true })
  hobbies?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class ListUserInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => [String], { nullable: true })
  hobbies?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => [String], { nullable: true })
  hobbies?: MongooseSchema.Types.ObjectId[];
}
