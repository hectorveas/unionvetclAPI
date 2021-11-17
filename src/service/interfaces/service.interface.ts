import { Document } from 'mongoose';

export interface Service extends Document {
  readonly name: string;
  readonly description: string[];
  readonly imageOne: string;
  readonly imageTwo: string;
  readonly imageThree: string;
  readonly imageFour: string;
}
