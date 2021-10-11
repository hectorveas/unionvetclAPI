import { Schema } from 'mongoose';

export const AdminSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'admin' },
  },
  { timestamps: true },
);
