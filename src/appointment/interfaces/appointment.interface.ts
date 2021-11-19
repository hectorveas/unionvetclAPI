import { Document } from 'mongoose';
import { Observation } from 'src/observation/interfaces/observation.interface';
import { Pet } from 'src/pet/interfaces/pet.interface';

export enum State {
  NOTSTATE,
  PENDING,
  CONFIRMED,
  REJECTED,
}

export interface Appointment extends Document {
  readonly patient: Pet;
  readonly userName: string;
  readonly userLastName: string;
  readonly userId: string;
  readonly state: State;
  readonly block: number;
  readonly date : {
    day: number;
    month: number;
    year: number;
  }
  readonly observation: Observation;
  readonly responsableCancellation: string;
  readonly motiveCancellation: string;
}
