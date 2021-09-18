import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDTO, UpdateContactDTO } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async createContact(@Res() res, @Body() createContactDTO: CreateContactDTO) {
    const contact = await this.contactService.createContact(createContactDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Contact Successfully Created',
      contact,
    });
  }

  @Get()
  async getContacts(@Res() res) {
    const contact = await this.contactService.getContacts();
    return res.status(HttpStatus.OK).json(contact);
  }

  @Get('/:id')
  async getContact(@Res() res, @Param('id') id) {
    const contact = await this.contactService.getContact(id);
    if (!contact) throw new NotFoundException('Contact does not exist!');
    return res.status(HttpStatus.OK).json(contact);
  }

  @Delete('/:id')
  async deleteContact(@Res() res, @Param('id') id) {
    const contact = await this.contactService.deleteContact(id);
    if (!contact) throw new NotFoundException('Contact does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Contact Deleted Successfully',
      contact,
    });
  }

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
