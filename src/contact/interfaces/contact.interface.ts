import { Document } from 'mongoose';

export interface Contact extends Document {
  readonly fullName: string;
  readonly phone: string;
  readonly email: string;
  readonly message: string;
  readonly isReaded: string;
}
