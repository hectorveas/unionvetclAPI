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
  import { CreateAppointmentDTO, UpdateAppointmentDTO } from './dto/appointment.dto';
  import { AppointmentService } from './appointment.service';
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('appointment')
  export class AppointmentController {
    constructor(private appointmentService: AppointmentService) {}
  
    @Roles(Role.ADMIN)
    @Post()
    async createAppointment(@Res() res, @Body() createAppointmentDTO: CreateAppointmentDTO) {
      const appointment = await this.appointmentService.createAppointment(createAppointmentDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Appointment Successfully Created',
        appointment,
      });
    }
  
    @Public()
    @Get()
    async getAppointments(@Res() res) {
      const appointment = await this.appointmentService.getAppointments();
      return res.status(HttpStatus.OK).json(appointment);
    }
  
    @Roles(Role.ADMIN)
    @Get('/:id')
    async getAppointment(@Res() res, @Param('id') id) {
      const appointment = await this.appointmentService.getAppointment(id);
      if (!appointment) throw new NotFoundException('Appointment does not exist!');
      return res.status(HttpStatus.OK).json(appointment);
    }
  
    @Roles(Role.ADMIN)
    @Delete('/:id')
    async deleteAppointment(@Res() res, @Param('id') id) {
      const appointment = await this.appointmentService.deleteAppointment(id);
      if (!appointment) throw new NotFoundException('Appointment does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Appointment Deleted Successfully',
        appointment,
      });
    }
  
    @Roles(Role.ADMIN)
    @Put('/:id')
    async updateAppointment(
      @Res() res,
      @Body() updateAppointmentDTO: UpdateAppointmentDTO,
      @Param('id') id,
    ) {
      const appointment = await this.appointmentService.updateAppointment(
        id,
        updateAppointmentDTO,
      );
      if (!appointment) throw new NotFoundException('Appointment does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Appointment Updated Successfully',
        appointment,
      });
    }
  }
  