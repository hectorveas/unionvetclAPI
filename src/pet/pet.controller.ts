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
import { CreatePetDTO, UpdatePetDTO } from './dto/pet.dto';
import { PetService } from './pet.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createPet(@Res() res, @Body() createPetDTO: CreatePetDTO) {
    const pet = await this.petService.createPet(createPetDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Pet Successfully Created',
      pet,
    });
  }

  @Public()
  @Get()
  async getPets(@Res() res) {
    const pet = await this.petService.getPets();
    return res.status(HttpStatus.OK).json(pet);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getPet(@Res() res, @Param('id') id) {
    const pet = await this.petService.getPet(id);
    if (!pet) throw new NotFoundException('Pet does not exist!');
    return res.status(HttpStatus.OK).json(pet);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deletePet(@Res() res, @Param('id') id) {
    const pet = await this.petService.deletePet(id);
    if (!pet) throw new NotFoundException('Pet does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Pet Deleted Successfully',
      pet,
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  async updatePet(
    @Res() res,
    @Body() updatePetDTO: UpdatePetDTO,
    @Param('id') id,
  ) {
    const pet = await this.petService.updatePet(id, updatePetDTO);
    if (!pet) throw new NotFoundException('Pet does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Pet Updated Successfully',
      pet,
    });
  }
}
