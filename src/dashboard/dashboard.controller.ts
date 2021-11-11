import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('products')
  async getProducts(@Res() res) {
    const product: any = await this.dashboardService.getProducts();
    console.log(product);
    return res.status(HttpStatus.OK).json(product);
  }


}
