import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ProductModule } from './product/product.module';
import { TipModule } from './tip/tip.module';
import { PublicationModule } from './publication/publication.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { ObservationModule } from './observation/observation.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SendGridModule } from "@anchan828/nest-sendgrid";
import { DashboardModule } from './dashboard/dashboard.module';

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
    ContactModule,
    ProductModule,
    TipModule,
    PublicationModule,
    ServiceModule,
    AuthModule,
    AdminModule,
    UserModule,
    PetModule,
    VaccineModule,
    ObservationModule,
    ScheduleModule,
    AppointmentModule,
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
