import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Hobby, HobbySchema } from '../hobby/models/hobby.model';
import { HobbyService } from './hobby.service';
import { HobbyResolver } from './hobby.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hobby.name,
        schema: HobbySchema,
      },
    ]),
  ],
  providers: [HobbyService, HobbyResolver],
})
export class HobbyModule {}
