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
  } from '@nestjs/common';
  import { AdminService } from './admin.service';
  import { CreateAdminDTO, UpdateAdminDTO } from './dto/admin.dto';
  
  @Controller('admin')
  export class AdminController {
    constructor(private adminService: AdminService) {}
  
    @Post()
    async createAdmin(@Res() res, @Body() createAdminDTO: CreateAdminDTO) {
      const admin = await this.adminService.createAdmin(createAdminDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Admin Successfully Created',
        admin,
      });
    }
  
    @Get()
    async getAdmins(@Res() res) {
      const admin = await this.adminService.getAdmins();
      return res.status(HttpStatus.OK).json(admin);
    }
  
    @Get('/:id')
    async getAdmin(@Res() res, @Param('id') id) {
      const admin = await this.adminService.getAdmin(id);
      if (!admin) throw new NotFoundException('Admin does not exist!');
      return res.status(HttpStatus.OK).json(admin);
    }
  
    @Delete('/:id')
    async deleteAdmin(@Res() res, @Param('id') id) {
      const admin = await this.adminService.deleteAdmin(id);
      if (!admin) throw new NotFoundException('Admin does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Admin Deleted Successfully',
        admin,
      });
    }
  
    @Put('/:id')
    async updateAdmin(
      @Res() res,
      @Body() updateAdminDTO: UpdateAdminDTO,
      @Param('id') id,
    ) {
      const admin = await this.adminService.updateAdmin(
        id,
        updateAdminDTO,
      );
      if (!admin) throw new NotFoundException('Admin does not exist!');
      return res.status(HttpStatus.OK).json({
        message: 'Admin Updated Successfully',
        admin,
      });
    }
  }
  