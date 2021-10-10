import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateServiceDTO,
  UpdateServiceDTO,
} from 'src/service/dto/service.dto';
import { Service } from 'src/service/interfaces/service.interface';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service')
    private readonly serviceModel: Model<Service>,
  ) {}

  async createService(
    createServiceDTO: CreateServiceDTO,
  ): Promise<Service> {
    const newService = new this.serviceModel(createServiceDTO);
    return newService.save();
  }

  async getServices(): Promise<Service[]> {
    const services = await this.serviceModel.find();
    return services;
  }

  async getService(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id);
    return service;
  }

  async deleteService(id: string): Promise<any> {
    const service = await this.serviceModel.findByIdAndDelete(id);
    return service;
  }

  async updateService(
    id: string,
    updateServiceDTO: UpdateServiceDTO,
  ): Promise<Service> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, { $set: updateServiceDTO }, { new: true })
      .exec();
    return updatedService;
  }
}
