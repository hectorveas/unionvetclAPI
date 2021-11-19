import { Schema } from 'mongoose';

export const VaccineSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateAplication: Date,
    vaccineType: { type: String, required: false },
    dose: { type: String, required: false },
  },
  { timestamps: true },
);
