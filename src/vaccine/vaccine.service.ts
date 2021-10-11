import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVaccineDTO, UpdateVaccineDTO } from './dto/vaccine.dto';
import { Vaccine } from './interfaces/vaccine.interface';

@Injectable()
export class VaccineService {
  constructor(
    @InjectModel('Vaccine') private readonly vaccineModel: Model<Vaccine>,
  ) {}

  async createVaccine(createVaccineDTO: CreateVaccineDTO): Promise<Vaccine> {
    const newVaccine = new this.vaccineModel(createVaccineDTO);
    return newVaccine.save();
  }

  async getVaccines(): Promise<Vaccine[]> {
    const vaccines = await this.vaccineModel.find();
    return vaccines;
  }

  async getVaccine(id: string): Promise<Vaccine> {
    const vaccine = await this.vaccineModel.findById(id);
    return vaccine;
  }

  async deleteVaccine(id: string): Promise<any> {
    const vaccine = await this.vaccineModel.findByIdAndDelete(id);
    return vaccine;
  }

  async updateVaccine(
    id: string,
    updateVaccineDTO: UpdateVaccineDTO,
  ): Promise<Vaccine> {
    const updatedVaccine = await this.vaccineModel
      .findByIdAndUpdate(id, { $set: updateVaccineDTO }, { new: true })
      .exec();
    return updatedVaccine;
  }
}
