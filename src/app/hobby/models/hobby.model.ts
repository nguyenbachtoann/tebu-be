import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

/**
 * @ObjectType using for define the type of GraphQL
 * @Schema using for define the schema of Mongo
 * Both can put into the same Model like this
 */

@ObjectType()
@Schema()
export class Hobby {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;
}

export type HobbyDocument = Hobby & Document;

export const HobbySchema = SchemaFactory.createForClass(Hobby);
