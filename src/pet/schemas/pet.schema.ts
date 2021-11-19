import { Schema } from 'mongoose';

export const PetSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    breed: { type: String, required: false },
    species: { type: String, required: false },
    color: { type: String, required: false },
    chipNumber: { type: String, required: false },
    gender: { type: String, required: true },
    dateBirth: Date,
    vaccinationHistory: {
      type: Schema.Types.ObjectId,
      ref: 'Vaccine',
      autopopulate: { maxDepth: 2 },
    },
    observationHistory: {
      type: Schema.Types.ObjectId,
      ref: 'Observation',
      autopopulate: { maxDepth: 2 },
    },
  },
  { timestamps: true },
);
PetSchema.plugin(require('mongoose-autopopulate'));
