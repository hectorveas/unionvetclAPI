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
import {
  CreateObservationDTO,
  UpdateObservationDTO,
} from './dto/observation.dto';
import { ObservationService } from './observation.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('observation')
export class ObservationController {
  constructor(private observationService: ObservationService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createObservation(
    @Res() res,
    @Body() createObservationDTO: CreateObservationDTO,
  ) {
    const observation = await this.observationService.createObservation(
      createObservationDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Observation Successfully Created',
      observation,
    });
  }

  @Public()
  @Get()
  async getObservations(@Res() res) {
    const observation = await this.observationService.getObservations();
    return res.status(HttpStatus.OK).json(observation);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getObservation(@Res() res, @Param('id') id) {
    const observation = await this.observationService.getObservation(id);
    if (!observation)
      throw new NotFoundException('Observation does not exist!');
    return res.status(HttpStatus.OK).json(observation);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteObservation(@Res() res, @Param('id') id) {
    const observation = await this.observationService.deleteObservation(id);
    if (!observation)
      throw new NotFoundException('Observation does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Observation Deleted Successfully',
      observation,
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  async updateObservation(
    @Res() res,
    @Body() updateObservationDTO: UpdateObservationDTO,
    @Param('id') id,
  ) {
    const observation = await this.observationService.updateObservation(
      id,
      updateObservationDTO,
    );
    if (!observation)
      throw new NotFoundException('Observation does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Observation Updated Successfully',
      observation,
    });
  }
}
