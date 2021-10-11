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
import { ContactService } from './contact.service';
import { CreateContactDTO, UpdateContactDTO } from './dto/contact.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Public()
  @Post()
  async createContact(@Res() res, @Body() createContactDTO: CreateContactDTO) {
    const contact = await this.contactService.createContact(createContactDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Contact Successfully Created',
      contact,
    });
  }

  @Roles(Role.ADMIN)
  @Get()
  async getContacts(@Res() res) {
    const contact = await this.contactService.getContacts();
    return res.status(HttpStatus.OK).json(contact);
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getContact(@Res() res, @Param('id') id) {
    const contact = await this.contactService.getContact(id);
    if (!contact) throw new NotFoundException('Contact does not exist!');
    return res.status(HttpStatus.OK).json(contact);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteContact(@Res() res, @Param('id') id) {
    const contact = await this.contactService.deleteContact(id);
    if (!contact) throw new NotFoundException('Contact does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Contact Deleted Successfully',
      contact,
    });
  }

  @Roles(Role.ADMIN)
  @Put('/:id')
  async updateContact(
    @Res() res,
    @Body() updateContactDTO: UpdateContactDTO,
    @Param('id') id,
  ) {
    const contact = await this.contactService.updateContact(
      id,
      updateContactDTO,
    );
    if (!contact) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Contact Updated Successfully',
      contact,
    });
  }
}
