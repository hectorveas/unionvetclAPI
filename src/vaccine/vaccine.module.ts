import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccineSchema } from './schemas/vaccine.schema';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vaccine', schema: VaccineSchema }]),
  ],
  controllers: [VaccineController],
  providers: [VaccineService]
})
export class VaccineModule {}
