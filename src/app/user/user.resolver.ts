import { AuthService } from 'src/app/auth/auth.service';
import { GqlAuthGuard } from 'src/app/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { User } from './models/user.model';
import { UserService } from './user.service';
import {
  CreateUserInput,
  ListUserInput,
  UpdateUserInput,
} from './models/user.inputs';
import { CurrentUser } from 'src/app/auth/auth.decorator';
import { ROLE_ENUM } from 'src/common/common.enum';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Query(() => User)
  async user(
    @CurrentUser() user: User,
    @Args('_id', { type: () => String })
    _id: MongooseSchema.Types.ObjectId,
  ) {
    this.authService.allowRole(user, [ROLE_ENUM.Admin, ROLE_ENUM.User]);

    const dbUser = await this.userService.getById(_id);
    this.authService.getOnly(dbUser, user, [ROLE_ENUM.User]);

    // dbUser.password = null;

    return dbUser;
  }

  @Query(() => [User])
  async users(
    @CurrentUser() user: User,
    @Args('filters', { nullable: true }) filters?: ListUserInput,
  ) {
    this.authService.allowRole(user, [ROLE_ENUM.Admin]);
    return this.userService.list(filters);
  }

  @Mutation(() => User)
  async create(
    @CurrentUser() user: User,
    @Args('payload') payload: CreateUserInput,
  ) {
    this.authService.allowRole(user, [ROLE_ENUM.Admin]);
    return this.userService.create(payload);
  }

  @Mutation(() => User)
  async update(
    @CurrentUser() user: User,
    @Args('payload') payload: UpdateUserInput,
  ) {
    this.authService.allowRole(user, [ROLE_ENUM.Admin]);
    return this.userService.update(payload);
  }

  @Mutation(() => User)
  async delete(
    @CurrentUser() user: User,
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    this.authService.allowRole(user, [ROLE_ENUM.Admin]);
    return this.userService.delete(_id);
  }

  @Query(() => User)
  async current(@CurrentUser() user?: User) {
    // user.password = null;
    return user;
  }

  // @ResolveField()
  // async hobbies(
  //   @Parent() person: UserDocument,
  //   @Args('populate') populate: boolean,
  // ) {
  //   if (populate)
  //     await person
  //       .populate({ path: 'hobbies', model: Hobby.name })
  //       .execPopulate();

  //   return person.hobbies;
  // }
}
