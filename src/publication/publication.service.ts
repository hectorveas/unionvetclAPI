import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePublicationDTO, UpdatePublicationDTO } from 'src/publication/dto/publication.dto';
import { Publication } from 'src/publication/interfaces/publication.interface';

@Injectable()
export class PublicationService {
  constructor(@InjectModel('Publication') private readonly publicationModel: Model<Publication>) {}

  async createPublication(createPublicationDTO: CreatePublicationDTO): Promise<Publication> {
    const newPublication = new this.publicationModel(createPublicationDTO);
    return newPublication.save();
  }

  async getPublications(): Promise<Publication[]> {
    const publications = await this.publicationModel.find();
    return publications;
  }

  async getPublication(id: string): Promise<Publication> {
    const publication = await this.publicationModel.findById(id);
    return publication;
  }

  async deletePublication(id: string): Promise<any> {
    const publication = await this.publicationModel.findByIdAndDelete(id);
    return publication;
  }

  async updatePublication(id: string, updatePublicationDTO: UpdatePublicationDTO): Promise<Publication> {
    const updatedPublication = await this.publicationModel
      .findByIdAndUpdate(id, { $set: updatePublicationDTO }, { new: true })
      .exec();
    return updatedPublication;
  }
}
