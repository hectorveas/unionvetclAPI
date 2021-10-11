import { Document } from 'mongoose';

export interface Admin extends Document {
  readonly email: string;
  password: string;
  readonly role: string;
}
