import { Document } from 'mongoose';

export interface Admin extends Document {
  readonly email: string;
  password: string;
  resetPasswordExpires? : Date;
  resetPasswordToken? : string;
  readonly role: string;
}
