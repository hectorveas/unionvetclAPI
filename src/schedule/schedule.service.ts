import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDTO, UpdateScheduleDTO } from './dto/schedule.dto';
import { Schedule } from './interfaces/schedule.interface';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>,
  ) {}

  async createSchedule(
    createScheduleDTO: CreateScheduleDTO,
  ): Promise<Schedule> {
    const newSchedule = new this.scheduleModel(createScheduleDTO);
    return newSchedule.save();
  }

  async getSchedules(): Promise<Schedule[]> {
    const schedules = await this.scheduleModel.find();
    return schedules;
  }

  async getSchedule(id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(id);
    return schedule;
  }

  async deleteSchedule(id: string): Promise<any> {
    const schedule = await this.scheduleModel.findByIdAndDelete(id);
    return schedule;
  }

  async updateSchedule(
    id: string,
    updateScheduleDTO: UpdateScheduleDTO,
  ): Promise<Schedule> {
    const updatedSchedule = await this.scheduleModel
      .findByIdAndUpdate(id, { $set: updateScheduleDTO }, { new: true })
      .exec();
    return updatedSchedule;
  }
}
