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
import {
  CreatePublicationDTO,
  UpdatePublicationDTO,
} from './dto/publication.dto';
import { PublicationService } from './publication.service';

@Controller('publication')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

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

  @Get()
  async getPublications(@Res() res) {
    const publication = await this.publicationService.getPublications();
    return res.status(HttpStatus.OK).json(publication);
  }

  @Get('/:id')
  async getPublication(@Res() res, @Param('id') id) {
    const publication = await this.publicationService.getPublication(id);
    if (!publication)
      throw new NotFoundException('Publication does not exist!');
    return res.status(HttpStatus.OK).json(publication);
  }

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
