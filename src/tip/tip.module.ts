import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipSchema } from './schemas/tip.schema';
import { TipController } from './tip.controller';
import { TipService } from './tip.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tip', schema: TipSchema }])],
  controllers: [TipController],
  providers: [TipService],
})
export class TipModule {}
