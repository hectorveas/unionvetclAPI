import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDTO, UpdateContactDTO } from './dto/contact.dto';
import { Contact } from './interfaces/contact.interface';
import { SendGridService } from '@anchan828/nest-sendgrid';
@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
    private readonly sendGrid: SendGridService,
  ) {}

  async createContact(createContactDTO: CreateContactDTO): Promise<Contact> {
    const newContact = new this.contactModel(createContactDTO);
    return newContact.save();
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = await this.contactModel.find();
    return contacts;
  }

  async getContact(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id);
    return contact;
  }

  async deleteContact(id: string): Promise<any> {
    const contact = await this.contactModel.findByIdAndDelete(id);
    return contact;
  }

  async updateContact(
    id: string,
    updateContactDTO: UpdateContactDTO,
  ): Promise<Contact> {
    const updatedContact = await this.contactModel
      .findByIdAndUpdate(id, { $set: updateContactDTO }, { new: true })
      .exec();

    if(updatedContact.response) {
      await this.sendGrid.send({
        //to: userRecover.email,
        from: process.env.FROM_EMAIL,
        templateId: "d-8ca3957d1ace4533a901cc0be520496a",
        personalizations: [
          {
            to: updatedContact.email ,
            dynamicTemplateData:{
              name: updatedContact.fullName,
              Response: updatedContact.response,
            },
          }
        ]
      });
    }
    return updatedContact;
  }
}
