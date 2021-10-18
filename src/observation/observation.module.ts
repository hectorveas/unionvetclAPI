import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObservationController } from './observation.controller';
import { ObservationService } from './observation.service';
import { ObservationSchema } from './schemas/observation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Observation', schema: ObservationSchema },
    ]),
  ],
  controllers: [ObservationController],
  providers: [ObservationService],
})
export class ObservationModule {}
