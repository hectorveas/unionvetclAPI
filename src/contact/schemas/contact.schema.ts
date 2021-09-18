import { Schema } from 'mongoose';

export const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    rut: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);
