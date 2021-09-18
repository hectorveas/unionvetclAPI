import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
