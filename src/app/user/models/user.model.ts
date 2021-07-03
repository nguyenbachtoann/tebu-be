import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * @ObjectType using for define the type of GraphQL
 * @Schema using for define the schema of Mongo
 * Both can put into the same Model like this
 */

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String, { nullable: true })
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  gender: string;

  @Field(() => String)
  @Prop()
  phone: string;

  // TODO: add Team

  @Field(() => String)
  @Prop()
  role: string;

  // @Field(() => [Hobby])
  // @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Hobby.name })
  // hobbies: MongooseSchema.Types.ObjectId[] | Hobby[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
