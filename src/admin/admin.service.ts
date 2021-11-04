import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDTO, UpdateAdminDTO } from './dto/admin.dto';
import { Admin } from './interfaces/admin.interface';
import * as bcrypt from 'bcrypt';
import * as crypto from "crypto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async createAdmin(createAdminDTO: CreateAdminDTO) {
    const newAdmin = new this.adminModel(createAdminDTO);
    const hashPassword = await bcrypt.hash(newAdmin.password, 10);
    newAdmin.password = hashPassword;
    const model = await newAdmin.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  findByEmail(email: string) {
    return this.adminModel.findOne({ email }).exec();
  }

  findByToken(token: string) {
    const date = Date.now();
    const dateNow = new Date(date);
    return this.adminModel.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: dateNow}}).exec();
  }

  async getAdmins(): Promise<Admin[]> {
    const admins = await this.adminModel.find();
    return admins;
  }

  async getAdmin(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id);
    return admin;
  }

  async deleteAdmin(id: string): Promise<any> {
    const admin = await this.adminModel.findByIdAndDelete(id);
    return admin;
  }

  async updateAdmin(
    id: string,
    updateAdminDTO: UpdateAdminDTO,
  ): Promise<Admin> {
    const updatedAdmin = await this.adminModel
      .findByIdAndUpdate(id, { $set: updateAdminDTO }, { new: true })
      .exec();
    return updatedAdmin;
  }

  generatePasswordReset(user: Admin) {
    let date = new Date();
    let dateExpire = 3600000;
    let rest = date.getTime() + dateExpire;
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = new Date(rest); //expires in an hour
    return user.save();
  };

  async updatePassword(user: Admin, newPassword: string) {
    let hashPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    return await user.save();
  }
}
