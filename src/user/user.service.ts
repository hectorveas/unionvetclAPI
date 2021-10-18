import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const newUser = new this.userModel(createUserDTO);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const model = await newUser.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async deleteUser(id: string): Promise<any> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDTO }, { new: true })
      .exec();
    return updatedUser;
  }
}
