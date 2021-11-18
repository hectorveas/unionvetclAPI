import { Schema } from 'mongoose';

export const ScheduleSchema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    month: { type: String, required: true },
    year: { type: String, required: true },
    day: { type: String, required: true },
    maxAppointment: { type: Number, required: true },
    Appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false,
        autopopulate: { maxDepth: 2 },
      },
    ],
  },
  { timestamps: true },
);
