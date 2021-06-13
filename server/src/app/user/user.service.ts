import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import * as _ from 'lodash';
import { User, UserDocument } from './models/user.model';
import {
  CreateUserInput,
  ListUserInput,
  UpdateUserInput,
} from './models/user.inputs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(payload: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(payload);
    return createdUser.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  list(filters: ListUserInput): Promise<User[]> {
    return this.userModel.find({ ...filters }).exec();
  }

  update(payload: UpdateUserInput): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(payload._id, payload, {
        new: true,
      })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findByIdAndDelete(_id).exec();
  }
}
