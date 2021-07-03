import { Md5 } from 'ts-md5/dist/md5';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User, UserDocument } from './models/user.model';
import {
  CreateUserInput,
  ListUserInput,
  UpdateUserInput,
} from './models/user.inputs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  saltRounds = 10;

  create(payload: CreateUserInput): Promise<User> {
    const user = this.getByEmail(payload.email);
    if (user) {
      throw new ConflictException('Email already in use!');
    }
    const hashedPassword = Md5.hashStr(payload.password);
    payload = { ...payload, password: hashedPassword };

    const createdUser = new this.userModel(payload);

    return createdUser.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  getByEmail(email: string): Promise<User> | undefined {
    return this.userModel.findOne({ email }).exec();
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
