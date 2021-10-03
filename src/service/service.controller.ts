import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { CreateServiceDTO, UpdateServiceDTO } from './dto/service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @Post()
    async createService(
      @Res() res,
      @Body() createServiceDTO: CreateServiceDTO,
    ) {
      const service = await this.serviceService.createService(
        createServiceDTO,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Service Successfully Created',
        service,
      });
    }
  
    @Get()
    async getServices(@Res() res) {
      const service = await this.serviceService.getServices();
      return res.status(HttpStatus.OK).json(service);
    }
  
    @Get('/:id')
    async getService(@Res() res, @Param('id') id) {
      const service = await this.serviceService.getService(id);
      if (!service)
        throw new NotFoundException('Service does not exist!');
      return res.status(HttpStatus.OK).json(service);
    }
  
    @Delete('/:id')
    async deleteService(@Res() res, @Param('id') id) {
      const service = await this.serviceService.deleteService(id);
      if (!service)
        throw new NotFoundException('Service does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Service Deleted Successfully',
        service,
      });
    }
  
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
      if (!service) throw new NotFoundException('Product does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Service Updated Successfully',
        service,
      });
    }
}
