import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Hobby, HobbyDocument } from './models/hobby.model';
import {
  CreateHobbyInput,
  ListHobbyInput,
  UpdateHobbyInput,
} from './models/hobby.inputs';

@Injectable()
export class HobbyService {
  constructor(
    @InjectModel(Hobby.name) private hobbyModel: Model<HobbyDocument>,
  ) {}

  create(payload: CreateHobbyInput): Promise<Hobby> {
    const createdHobby = new this.hobbyModel(payload);
    return createdHobby.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId): Promise<Hobby> {
    return this.hobbyModel.findById(_id).exec();
  }

  list(filters: ListHobbyInput): Promise<Hobby[]> {
    return this.hobbyModel.find({ ...filters }).exec();
  }

  update(payload: UpdateHobbyInput): Promise<Hobby> {
    return this.hobbyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.hobbyModel.findByIdAndDelete(_id).exec();
  }
}
