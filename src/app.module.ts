import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration'
import { MongooseModule } from '@nestjs/mongoose'
import { PlaceModule } from './modules/place/place.module';
import { CommentModule } from './modules/comment/comment.module';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('db.mongo.url')
      })
    }),
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req })
    }),
    PlaceModule,
    CommentModule,
  ],
})
export class AppModule { }
