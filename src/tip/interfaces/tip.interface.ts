import { Document } from 'mongoose';

export interface Tip extends Document {
  readonly title: string;
  readonly imageUrl: string;
  readonly content: string;
}
