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
import { CreateVaccineDTO, UpdateVaccineDTO } from './dto/vaccine.dto';
import { VaccineService } from './vaccine.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vaccine')
export class VaccineController {
  constructor(private vaccineService: VaccineService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createVaccine(@Res() res, @Body() createVaccineDTO: CreateVaccineDTO) {
    const vaccine = await this.vaccineService.createVaccine(createVaccineDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Vaccine Successfully Created',
      vaccine,
    });
  }

  @Public()
  @Get()
  async getVaccines(@Res() res) {
    const vaccine = await this.vaccineService.getVaccines();
    return res.status(HttpStatus.OK).json(vaccine);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getVaccine(@Res() res, @Param('id') id) {
    const vaccine = await this.vaccineService.getVaccine(id);
    if (!vaccine) throw new NotFoundException('Vaccine does not exist!');
    return res.status(HttpStatus.OK).json(vaccine);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteVaccine(@Res() res, @Param('id') id) {
    const vaccine = await this.vaccineService.deleteVaccine(id);
    if (!vaccine) throw new NotFoundException('Vaccine does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Vaccine Deleted Successfully',
      vaccine,
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  async updateVaccine(
    @Res() res,
    @Body() updateVaccineDTO: UpdateVaccineDTO,
    @Param('id') id,
  ) {
    const vaccine = await this.vaccineService.updateVaccine(
      id,
      updateVaccineDTO,
    );
    if (!vaccine) throw new NotFoundException('Vaccine does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Vaccine Updated Successfully',
      vaccine,
    });
  }
}
