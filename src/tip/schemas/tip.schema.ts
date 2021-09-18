import { Schema } from 'mongoose';

export const TipSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);
