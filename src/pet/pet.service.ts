import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDTO, UpdatePetDTO } from './dto/pet.dto';
import { Pet } from './interfaces/pet.interface';

@Injectable()
export class PetService {
  constructor(@InjectModel('Pet') private readonly petModel: Model<Pet>) {}

  async createPet(createPetDTO: CreatePetDTO): Promise<Pet> {
    const newPet = new this.petModel(createPetDTO);
    return newPet.save();
  }

  async getPets(): Promise<Pet[]> {
    const pets = await this.petModel.find();
    return pets;
  }

  async getPet(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id);
    return pet;
  }

  async deletePet(id: string): Promise<any> {
    const pet = await this.petModel.findByIdAndDelete(id);
    return pet;
  }

  async updatePet(id: string, updatePetDTO: UpdatePetDTO): Promise<Pet> {
    const updatedPet = await this.petModel
      .findByIdAndUpdate(id, { $set: updatePetDTO }, { new: true })
      .exec();
    return updatedPet;
  }
}
