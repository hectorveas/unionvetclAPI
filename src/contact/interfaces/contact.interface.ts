import { Document } from 'mongoose';

export interface Contact extends Document {
  readonly name: string;
  readonly rut: string;
  readonly email: string;
  readonly message: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
