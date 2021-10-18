import { Schema } from 'mongoose';

export const AppointmentSchema = new Schema(
  {
    idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: { maxDepth: 2 } },
    userName: { type: String, required: false },	
    userLastName: { type: String, required: false },	
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    state: { type: Number, default: 0 },
    observation: [{ type: Schema.Types.ObjectId, ref: 'Observation', required: false, autopopulate: { maxDepth: 2 } }],
  },
  { timestamps: true },
);
AppointmentSchema.plugin(require('mongoose-autopopulate'));
