import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { User } from './models/user.model';
import { UserService } from './user.service';
import {
  CreateUserInput,
  ListUserInput,
  UpdateUserInput,
} from './models/user.inputs';
import { UserDocument } from './models/user.model';
import { Hobby } from 'src/app/hobby/models/hobby.model';
import { CurrentUser } from '../auth/auth.current-user.decorator';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private personService: UserService) {}

  @Query(() => User)
  async user(
    @CurrentUser() user: User,
    @Args('_id', { type: () => String })
    _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.getById(_id);
  }

  @Query(() => [User])
  async users(
    @CurrentUser() user: User,
    @Args('filters', { nullable: true }) filters?: ListUserInput,
  ) {
    console.log('user: ', user);
    return this.personService.list(filters);
  }

  @Mutation(() => User)
  async createUser(@Args('payload') payload: CreateUserInput) {
    return this.personService.create(payload);
  }

  @Mutation(() => User)
  async updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.personService.update(payload);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.delete(_id);
  }

  @ResolveField()
  async hobbies(
    @Parent() person: UserDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await person
        .populate({ path: 'hobbies', model: Hobby.name })
        .execPopulate();

    return person.hobbies;
  }
}
