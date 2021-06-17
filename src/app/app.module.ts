import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HobbyModule } from './hobby/hobby.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    HobbyModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
      debug: false,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
