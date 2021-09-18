import { Document } from 'mongoose';

export interface Product extends Document {
  readonly imageUrl: string;
  readonly brand: string;
  readonly name: string;
  readonly description: string;
  readonly stock: number;
  readonly sale: boolean;
}
