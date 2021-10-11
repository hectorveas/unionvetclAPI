import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/guards/decorators/public.decorator';
import { Roles } from 'src/auth/guards/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { CreateScheduleDTO, UpdateScheduleDTO } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createSchedule(
    @Res() res,
    @Body() createScheduleDTO: CreateScheduleDTO,
  ) {
    const schedule = await this.scheduleService.createSchedule(
      createScheduleDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Schedule Successfully Created',
      schedule,
    });
  }

  @Public()
  @Get()
  async getSchedules(@Res() res) {
    const schedule = await this.scheduleService.getSchedules();
    return res.status(HttpStatus.OK).json(schedule);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getSchedule(@Res() res, @Param('id') id) {
    const schedule = await this.scheduleService.getSchedule(id);
    if (!schedule) throw new NotFoundException('Schedule does not exist!');
    return res.status(HttpStatus.OK).json(schedule);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteSchedule(@Res() res, @Param('id') id) {
    const schedule = await this.scheduleService.deleteSchedule(id);
    if (!schedule) throw new NotFoundException('Schedule does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Schedule Deleted Successfully',
      schedule,
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  async updateSchedule(
    @Res() res,
    @Body() updateScheduleDTO: UpdateScheduleDTO,
    @Param('id') id,
  ) {
    const schedule = await this.scheduleService.updateSchedule(
      id,
      updateScheduleDTO,
    );
    if (!schedule) throw new NotFoundException('Schedule does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Schedule Updated Successfully',
      schedule,
    });
  }
}
