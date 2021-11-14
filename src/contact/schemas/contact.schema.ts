import { Schema } from 'mongoose';

export const ContactSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isReaded: { type: Boolean, default: false},
    response: { type: String, required: false }
  },
  { timestamps: true },
);
