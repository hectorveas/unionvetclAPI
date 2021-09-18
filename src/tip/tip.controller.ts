import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { CreateTipDTO, UpdateTipDTO } from './dto/tip.dto';
import { TipService } from './tip.service';

@Controller('tip')
export class TipController {
  constructor(private tipService: TipService) {}

  @Post()
  async createTip(@Res() res, @Body() createTipDTO: CreateTipDTO) {
    const tip = await this.tipService.createTip(createTipDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Tip Successfully Created',
      tip,
    });
  }

  @Get()
  async getTips(@Res() res) {
    const tip = await this.tipService.getTips();
    return res.status(HttpStatus.OK).json(tip);
  }

  @Get('/:id')
  async getTip(@Res() res, @Param('id') id) {
    const tip = await this.tipService.getTip(id);
    if (!tip) throw new NotFoundException('Tip does not exist!');
    return res.status(HttpStatus.OK).json(tip);
  }

  @Delete('/:id')
  async deleteTip(@Res() res, @Param('id') id) {
    const tip = await this.tipService.deleteTip(id);
    if (!tip) throw new NotFoundException('Tip does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Tip Deleted Successfully',
      tip,
    });
  }

  @Put('/:id')
  async updateTip(
    @Res() res,
    @Body() updateTipDTO: UpdateTipDTO,
    @Param('id') id,
  ) {
    const tip = await this.tipService.updateTip(
      id,
      updateTipDTO,
    );
    if (!tip) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Tip Updated Successfully',
      tip,
    });
  }
}
