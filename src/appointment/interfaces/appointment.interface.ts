import { Document } from 'mongoose';
import { Observation } from 'src/observation/interfaces/observation.interface';

export enum State {
  NOTSTATE,
  PENDING,
  CONFIRMED,
  REJECTED,
}

export interface Appointment extends Document {
  readonly idUser: string;
  readonly userName: string;
  readonly userLastName: string;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly state: State;
  readonly observation: Observation;
}
