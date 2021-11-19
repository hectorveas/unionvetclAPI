import { Document } from 'mongoose';

export interface Publication extends Document {
  readonly url: string;
  readonly description: string;
}
