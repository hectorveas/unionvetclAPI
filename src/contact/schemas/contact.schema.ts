import { Schema } from 'mongoose';

export const ContactSchema = new Schema({
  name: String,
  rut: String,
  email: String,
  message: String,
  //createdAt: { type: Date, default: Date.now },
  //updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
