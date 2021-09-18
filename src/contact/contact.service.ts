import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDTO, UpdateContactDTO } from './dto/contact.dto';
import { Contact } from './interfaces/contact.interface';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
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
    return updatedContact;
  }
}
