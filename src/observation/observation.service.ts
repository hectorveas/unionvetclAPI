import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateObservationDTO, UpdateObservationDTO } from './dto/observation.dto';
import { Observation } from './interfaces/observation.interface';

@Injectable()
export class ObservationService {
  constructor(
    @InjectModel('Observation') private readonly observationModel: Model<Observation>,
  ) {}

  async createObservation(createObservationDTO: CreateObservationDTO): Promise<Observation> {
    const newObservation = new this.observationModel(createObservationDTO);
    return newObservation.save();
  }

  async getObservations(): Promise<Observation[]> {
    const observations = await this.observationModel.find();
    return observations;
  }

  async getObservation(id: string): Promise<Observation> {
    const observation = await this.observationModel.findById(id);
    return observation;
  }

  async deleteObservation(id: string): Promise<any> {
    const observation = await this.observationModel.findByIdAndDelete(id);
    return observation;
  }

  async updateObservation(
    id: string,
    updateObservationDTO: UpdateObservationDTO,
  ): Promise<Observation> {
    const updatedObservation = await this.observationModel
      .findByIdAndUpdate(id, { $set: updateObservationDTO }, { new: true })
      .exec();
    return updatedObservation;
  }
}
