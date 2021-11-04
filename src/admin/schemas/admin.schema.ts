import { Schema } from 'mongoose';

export const AdminSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    role: { type: String, required: true, default: 'admin' },
  },
  { timestamps: true },
);
