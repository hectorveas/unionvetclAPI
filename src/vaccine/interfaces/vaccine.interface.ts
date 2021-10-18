import { Document } from 'mongoose';

export interface Vaccine extends Document {
  readonly name: string;
  readonly description: string;
  readonly DateAplication: Date;
  readonly vaccineType: string;
  readonly dose: string;
}
