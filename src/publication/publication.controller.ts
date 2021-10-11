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
  CreatePublicationDTO,
  UpdatePublicationDTO,
} from './dto/publication.dto';
import { PublicationService } from './publication.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('publication')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createPublication(
    @Res() res,
    @Body() createPublicationDTO: CreatePublicationDTO,
  ) {
    const publication = await this.publicationService.createPublication(
      createPublicationDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Publication Successfully Created',
      publication,
    });
  }

  @Public()
  @Get()
  async getPublications(@Res() res) {
    const publication = await this.publicationService.getPublications();
    return res.status(HttpStatus.OK).json(publication);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getPublication(@Res() res, @Param('id') id) {
    const publication = await this.publicationService.getPublication(id);
    if (!publication)
      throw new NotFoundException('Publication does not exist!');
    return res.status(HttpStatus.OK).json(publication);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deletePublication(@Res() res, @Param('id') id) {
    const publication = await this.publicationService.deletePublication(id);
    if (!publication)
      throw new NotFoundException('Publication does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Publication Deleted Successfully',
      publication,
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  async updatePublication(
    @Res() res,
    @Body() updatePublicationDTO: UpdatePublicationDTO,
    @Param('id') id,
  ) {
    const publication = await this.publicationService.updatePublication(
      id,
      updatePublicationDTO,
    );
    if (!publication) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Publication Updated Successfully',
      publication,
    });
  }
}
