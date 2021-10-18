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
import { CreateServiceDTO, UpdateServiceDTO } from './dto/service.dto';
import { ServiceService } from './service.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  //@Roles(Role.ADMIN)
  @Post()
  async createService(@Res() res, @Body() createServiceDTO: CreateServiceDTO) {
    const service = await this.serviceService.createService(createServiceDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Service Successfully Created',
      service,
    });
  }

  //@Public()
  @Get()
  async getServices(@Res() res) {
    const service = await this.serviceService.getServices();
    return res.status(HttpStatus.OK).json(service);
  }

  //@Roles(Role.ADMIN)
  @Get('/:id')
  async getService(@Res() res, @Param('id') id) {
    const service = await this.serviceService.getService(id);
    if (!service) throw new NotFoundException('Service does not exist!');
    return res.status(HttpStatus.OK).json(service);
  }

  //@Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteService(@Res() res, @Param('id') id) {
    const service = await this.serviceService.deleteService(id);
    if (!service) throw new NotFoundException('Service does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Service Deleted Successfully',
      service,
    });
  }

  //@Roles(Role.ADMIN)
  @Put('/:id')
  async updateService(
    @Res() res,
    @Body() updateServiceDTO: UpdateServiceDTO,
    @Param('id') id,
  ) {
    const service = await this.serviceService.updateService(
      id,
      updateServiceDTO,
    );
    if (!service) throw new NotFoundException('Service does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Service Updated Successfully',
      service,
    });
  }
}
