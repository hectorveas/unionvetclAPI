import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
} from './dto/appointment.dto';
import { Appointment } from './interfaces/appointment.interface';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async createAppointment(
    createAppointmentDTO: CreateAppointmentDTO,
  ): Promise<Appointment> {
    const newAppointment = new this.appointmentModel(createAppointmentDTO);
    return newAppointment.save();
  }

  async getAppointments(): Promise<Appointment[]> {
    const appointments = await this.appointmentModel.find();
    return appointments;
  }

  async getAppointment(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id);
    return appointment;
  }

  async deleteAppointment(id: string): Promise<any> {
    const appointment = await this.appointmentModel.findByIdAndDelete(id);
    return appointment;
  }

  async updateAppointment(
    id: string,
    updateAppointmentDTO: UpdateAppointmentDTO,
  ): Promise<Appointment> {
    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, { $set: updateAppointmentDTO }, { new: true })
      .exec();
    return updatedAppointment;
  }
}
