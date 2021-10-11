import { Document } from 'mongoose';

export interface Pet extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
  readonly species: string;
  readonly color: string;
  readonly chipNumber: string;
  readonly gender: string;
  readonly dateBirth: Date;
  readonly vaccinationHistory: [string];
  readonly ObservationHistory: [string];
}
