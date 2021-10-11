import { Document } from 'mongoose';

export interface Service extends Document {
  readonly name: string;
  readonly description: string[];
  readonly imagesURL: string[];
};