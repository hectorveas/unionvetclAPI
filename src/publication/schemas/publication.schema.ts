import { Schema } from 'mongoose';

export const PublicationSchema = new Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true },
);
