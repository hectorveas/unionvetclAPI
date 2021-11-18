import { Schema } from 'mongoose';

export const AppointmentSchema = new Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: { maxDepth: 2 },
    },
    userName: { type: String, required: false },
    userLastName: { type: String, required: false },
    startDate: Date,
    endDate: Date,
    state: { type: Number, default: 0 },
    observation: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Observation',
        required: false,
        autopopulate: { maxDepth: 2 },
      },
    ],
    responsableCncellation: { type: String, required: false },
    motiveCancellation: { type: String, required: false },
  },
  { timestamps: true },
);
AppointmentSchema.plugin(require('mongoose-autopopulate'));
