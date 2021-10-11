import { Schema } from 'mongoose';

export const ScheduleSchema = new Schema(
  {
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    month: {type: String, required: true},
    year: {type: String, required: true},
    day: {type: String, required: true},
    maxAppointment: {type: Number, required: true},
    appointments: [{type: Schema.Types.ObjectId, ref: 'Appointment'}]
  },
  { timestamps: true },
);