import { Document } from 'mongoose';

export interface Contact extends Document {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly message: string;
}
