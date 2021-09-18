import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationSchema } from './schemas/publication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Publication', schema: PublicationSchema }]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService]
})
export class PublicationModule {}
