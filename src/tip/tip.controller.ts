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
import { CreateTipDTO, UpdateTipDTO } from './dto/tip.dto';
import { TipService } from './tip.service';
import { Public } from 'src/auth/guards/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

//import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

//@UseGuards(ApiKeyGuard)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tip')
export class TipController {
  constructor(private tipService: TipService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createTip(@Res() res, @Body() createTipDTO: CreateTipDTO) {
    const tip = await this.tipService.createTip(createTipDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Tip Successfully Created',
      tip,
    });
  }

  @Public()
  @Get()
  async getTips(@Res() res) {
    const tip = await this.tipService.getTips();
    return res.status(HttpStatus.OK).json(tip);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getTip(@Res() res, @Param('id') id) {
    const tip = await this.tipService.getTip(id);
    if (!tip) throw new NotFoundException('Tip does not exist!');
    return res.status(HttpStatus.OK).json(tip);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteTip(@Res() res, @Param('id') id) {
    const tip = await this.tipService.deleteTip(id);
    if (!tip) throw new NotFoundException('Tip does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Tip Deleted Successfully',
      tip,
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  async updateTip(
    @Res() res,
    @Body() updateTipDTO: UpdateTipDTO,
    @Param('id') id,
  ) {
    const tip = await this.tipService.updateTip(id, updateTipDTO);
    if (!tip) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Tip Updated Successfully',
      tip,
    });
  }
}
