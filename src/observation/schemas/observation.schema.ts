import { Schema } from 'mongoose';

export const ObservationSchema = new Schema(
  {
    idPet: { type: Schema.Types.ObjectId, ref: 'Pet' },
    doctor: { type: String },
    motive: { type: String, required: true },
    weight: { type: Number, required: true },
    preDiagnostic: { type: String },
    anamnesis: { type: String },
    diagnostic: { type: String },
    treatment: { type: String },
    vaccines: {
      type: Schema.Types.ObjectId,
      ref: 'Vaccine',
      required: false,
      autopopulate: { maxDepth: 2 },
    },
  },
  { timestamps: true },
);
ObservationSchema.plugin(require('mongoose-autopopulate'));
