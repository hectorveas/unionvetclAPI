import { Schema } from 'mongoose';

export const TipSchema = new Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true },
);
